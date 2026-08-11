import { useState } from "react";

/**
 * Plain portrait for the ProfileCard front. Deliberately unfiltered — no
 * glitch/scanline/chromatic treatment — so the photo reads as a photo.
 * Falls back to an "MJ" monogram if the image is missing.
 */
export default function Portrait({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-beige-100">
        <span className="text-5xl font-semibold tracking-tight text-beige-600">
          MJ
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-[center_18%]"
    />
  );
}
