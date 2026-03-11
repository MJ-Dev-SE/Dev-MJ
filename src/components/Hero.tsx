import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullName = "MARK JEROHM CASTRO";
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(true);
  const indexRef = useRef(0);

  useEffect(() => {
    if (currentSlide === 0) {
      timerRef.current = setInterval(() => {
        if (isTypingRef.current) {
          if (indexRef.current < fullName.length) {
            indexRef.current++;
            setTypedText(fullName.slice(0, indexRef.current));
          } else {
            isTypingRef.current = false;
          }
        } else {
          if (indexRef.current > 0) {
            indexRef.current--;
            setTypedText(fullName.slice(0, indexRef.current));
          } else {
            isTypingRef.current = true;
          }
        }
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTypedText("");
      indexRef.current = 0;
      isTypingRef.current = true;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSlide]);

  const slides = [
    {
      id: 0,
      title: "Welcome",
      content: (
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-amber-100 min-h-[72px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-2xl text-amber-200">Software Engineer</p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <div>📞 0993 756 4973</div>
            <div>📧 markjerohm@gmail.com</div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Professional Summary",
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-100">About the Vision</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Building a web-based basketball playbook system that catalogs plays,
            player roles, and rhythm so every sequence stays connected. The plan
            is to translate live-game logic into reusable plays, keyed on
            player strengths and the next scoring opportunity.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Experience",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-bold text-amber-100 text-center mb-8">
            Experience
          </h2>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-amber-200">
              Full-Stack Developer - Inventory Management System
            </h3>
            <p className="text-amber-100 font-semibold">PNP Inventory System</p>
            <p className="text-amber-200/80 text-sm mb-3">January 2026 – Present</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Improved system performance and efficiency</li>
              <li>
                • Implemented user authentication and role-based access control
              </li>
              <li>
                • Added automatic data updates for better organization and
                security
              </li>
            </ul>
          </div>

          {/* <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-amber-200">
              Full-Stack Developer
            </h3>
            <p className="text-red-900 font-semibold">Task Management System</p>
            <p className="text-gray-500 text-sm mb-3">
              August 2025 – December 2025
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>
                • Developed web application using Python (Flask) with Firebase
              </li>
              <li>• Designed productivity-tracking features</li>
              <li>• Increased user engagement by approximately 25%</li>
            </ul>
          </div> */}

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-amber-200">
              Mobile App - Involve Unity Integration
            </h3>
            <p className="text-amber-100 font-semibold">
              ShopFur (Augmented Reality Project)
            </p>
            <p className="text-amber-200/80 text-sm mb-3">
              January 2025 – December 2025
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>
                • Developed mobile app using React Native (TypeScript) and
                Firebase
              </li>
              <li>• Integrated Unity for augmented reality features</li>
              <li>• Improved overall app stability and user experience</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-10 w-72 h-72 bg-amber-500/40 blur-[140px]" />
          <div className="absolute -bottom-12 left-6 w-64 h-64 bg-rose-500/30 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_65%)]" />
        </div>
        {/* Carousel Container */}
        <div className="relative bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950 rounded-3xl shadow-[0_25px_60px_rgba(2,6,23,0.9)] border border-slate-800 p-8 md:p-12 min-h-[560px] overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[1.25fr,0.75fr] items-center text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
                <span>Active</span>
                <span>Building for impact</span>
              </div>
              <div>{slides[currentSlide].content}</div>
              <div className="text-sm leading-relaxed text-slate-200 border border-slate-800 bg-white/5 rounded-2xl px-6 py-4 backdrop-blur">
                <p className="font-semibold text-white">Current focus</p>
                <p className="text-slate-300">
                  Prototyping a basketball playbook studio that keeps plays,
                  roles, and tempo in sync for the next roster run.
                </p>
              </div>
            </div>
            <div className="space-y-6">
            <div className="bg-white/5 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Mode</span>
                <span>Prototype</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                Basketball Playbook
              </h3>
              <p className="text-sm text-slate-300">
                Mapping play types, player roles, and tempo into a single web
                layer so squads can practice and pivot faster.
              </p>
              <div className="h-1.5 w-full bg-slate-900 rounded-full">
                <div className="h-full w-2/3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                Playbook progress · 68%
              </p>
              <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-slate-500">
                <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/60">
                  Plays
                </span>
                <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/60">
                  Roles
                </span>
                <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/60">
                  Analytics
                </span>
              </div>
            </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 text-sm text-slate-300">
                <h4 className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Play Rhythm
                </h4>
                <p className="text-base text-white font-semibold">
                  Player roles and transition quality
                </p>
                <div className="space-y-2">
                  <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>Defense sets</span>
                    <span>Live</span>
                  </p>
                  <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>Rotation trails</span>
                    <span>Next lab</span>
                  </p>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full">
                  <div className="h-full w-2/5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                  Variation lab · Sprint 3
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "w-12 bg-sky-400"
                  : "w-3 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/projects"
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-semibold transition-all"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-amber-400 hover:text-amber-200 transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
