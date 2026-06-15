import { useEffect, useRef } from "react";

/**
 * AuroraField — an interactive WebGL shader "wallpaper".
 *
 * Renders a flowing aurora curtain in a black/amber palette behind the whole
 * app. It reacts to the pointer (the aurora bends toward and brightens around
 * the cursor) and to clicks (each click fires an expanding ripple of light).
 *
 * Implemented in raw WebGL so it adds no dependencies. The canvas is fixed,
 * full-screen and `pointer-events: none`, so it never intercepts clicks — input
 * is read from window-level listeners instead.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Up to this many simultaneous click ripples.
const MAX_RIPPLES = 6;

const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;        // 0..1, y up
uniform float u_mouseDown;    // 0..1 eased press amount
uniform vec3  u_ripples[${MAX_RIPPLES}]; // xy = pos (0..1), z = age in seconds (<0 = inactive)

// --- value noise + fbm ---------------------------------------------------
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // aspect-correct space centered for distance maths
  vec2 asp = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * asp;
  vec2 m = (u_mouse - 0.5) * asp;

  float t = u_time * 0.06;

  // Pointer influence: a soft pull that warps the aurora toward the cursor.
  vec2 toM = m - p;
  float mDist = length(toM);
  float pull = exp(-mDist * 2.2) * (0.35 + 0.5 * u_mouseDown);
  vec2 warp = normalize(toM + 1e-5) * pull * 0.25;

  vec2 q = p + warp;

  // Flowing curtains: domain-warped fbm forming vertical aurora streaks.
  float flow = fbm(q * 1.6 + vec2(t * 1.3, t * 0.4));
  vec2 w2 = vec2(fbm(q * 2.0 + flow + t), fbm(q * 2.0 - flow - t * 0.7));
  float curtains = fbm(q * vec2(2.2, 1.1) + w2 * 1.4 + vec2(0.0, -t * 2.0));

  // Vertical banding so it reads as curtains rather than blobs.
  float bands = 0.55 + 0.45 * sin(q.x * 5.0 + curtains * 6.2831 + t * 2.0);
  float aurora = pow(curtains * bands, 1.7);

  // Height falloff — brightest in the upper portion, fading to black bottom.
  float height = smoothstep(-0.6, 0.85, p.y + curtains * 0.35);
  aurora *= mix(0.35, 1.15, height);

  // Pointer glow halo.
  float glow = exp(-mDist * 3.0) * (0.45 + 0.9 * u_mouseDown);
  aurora += glow * 0.6;

  // Click ripples — expanding bright rings of light.
  float ripple = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec3 r = u_ripples[i];
    if (r.z < 0.0) continue;
    vec2 rp = (r.xy - 0.5) * asp;
    float d = length(p - rp);
    float radius = r.z * 0.9;            // expansion speed
    float life = clamp(1.0 - r.z / 2.2, 0.0, 1.0); // fade over ~2.2s
    float ring = exp(-pow((d - radius) * 14.0, 2.0));
    ripple += ring * life * 1.4;
  }
  aurora += ripple;

  // --- palette: black -> deep amber -> gold -> warm white ----------------
  vec3 c0 = vec3(0.015, 0.012, 0.0);            // near black
  vec3 c1 = vec3(0.35, 0.16, 0.0);              // ember
  vec3 c2 = vec3(0.96, 0.62, 0.06);             // amber/gold
  vec3 c3 = vec3(1.0, 0.92, 0.62);              // hot highlight

  float a = clamp(aurora, 0.0, 1.6);
  vec3 col = mix(c0, c1, smoothstep(0.0, 0.45, a));
  col = mix(col, c2, smoothstep(0.4, 0.95, a));
  col = mix(col, c3, smoothstep(0.95, 1.4, a));

  // subtle grain to avoid banding
  col += (hash(uv * u_resolution.xy + t) - 0.5) * 0.015;

  // vignette to keep edges grounded in black
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * asp));
  col *= mix(0.6, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface Ripple {
  x: number;
  y: number;
  start: number;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    // eslint-disable-next-line no-console
    console.error("Shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function AuroraField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false }) as
        | WebGLRenderingContext
        | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      // Graceful fallback: a static amber gradient if WebGL is unavailable.
      canvas.style.background =
        "radial-gradient(120% 90% at 50% 0%, #3a2400 0%, #1a1200 40%, #000 100%)";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Full-screen triangle.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uMouseDown = gl.getUniformLocation(prog, "u_mouseDown");
    const uRipples = gl.getUniformLocation(prog, "u_ripples");

    // --- interaction state -------------------------------------------------
    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    let pressTarget = 0;
    let press = 0;
    let ripples: Ripple[] = [];

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight; // flip to y-up
    };
    const onDown = (e: PointerEvent) => {
      pressTarget = 1;
      ripples.push({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
        start: performance.now() / 1000,
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };
    const onUp = () => {
      pressTarget = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let raf = 0;
    const rippleData = new Float32Array(MAX_RIPPLES * 3);

    const render = () => {
      const now = performance.now();
      const time = (now - start) / 1000;

      // ease pointer + press
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
      press += (pressTarget - press) * 0.12;

      // expire old ripples (>2.2s)
      ripples = ripples.filter((r) => now / 1000 - r.start < 2.2);
      rippleData.fill(-1);
      for (let i = 0; i < ripples.length && i < MAX_RIPPLES; i++) {
        const r = ripples[i];
        rippleData[i * 3] = r.x;
        rippleData[i * 3 + 1] = r.y;
        rippleData[i * 3 + 2] = now / 1000 - r.start;
      }

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseDown, press);
      gl.uniform3fv(uRipples, rippleData);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    // Respect reduced-motion: render a single frame, skip the loop.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, 0);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.uniform1f(uMouseDown, 0);
      rippleData.fill(-1);
      gl.uniform3fv(uRipples, rippleData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ pointerEvents: "none", background: "#000" }}
    />
  );
}
