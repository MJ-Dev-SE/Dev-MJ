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
          <h1 className="text-6xl font-bold text-red-900 min-h-[72px]">
            {typedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-2xl text-sky-400">Software Engineer</p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <div>📞 0993 756 4973</div>
            <div>📧 markjerohmcastro05@gmail.com</div>
          </div>
          <p className="text-gray-500">
            📍 Brgy. Siranglupa, Calamba City, Laguna
          </p>
        </div>
      ),
    },
    {
      id: 1,
      title: "Professional Summary",
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-red-900">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Software Engineer with experience in developing and maintaining
            software applications across different projects in the Philippines.
            Skilled in working with databases, APIs, and modern development
            tools. Experienced in collaborating with cross-functional teams to
            deliver efficient, scalable, and high-quality software solutions
            within deadlines.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Experience",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-bold text-red-900 text-center mb-8">
            Experience
          </h2>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-sky-400">
              Full-Stack Developer
            </h3>
            <p className="text-red-900 font-semibold">PNP Inventory System</p>
            <p className="text-gray-500 text-sm mb-3">January 2026 – Present</p>
            <ul className="space-y-2 text-gray-400">
              <li>• Improved system performance and efficiency by 20%</li>
              <li>
                • Implemented user authentication and role-based access control
              </li>
              <li>
                • Added automatic data updates for better organization and
                security
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-sky-400">
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
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-sky-400">
              Software Engineer
            </h3>
            <p className="text-red-900 font-semibold">
              ShopFur (Augmented Reality Project)
            </p>
            <p className="text-gray-500 text-sm mb-3">
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
    <section className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl relative">
        {/* Carousel Container */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-12 min-h-[600px] flex items-center justify-center">
          {/* Slide Content */}
          <div className="text-center w-full">
            {slides[currentSlide].content}
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
            className="px-6 py-3 rounded-lg bg-sky-400 hover:bg-sky-500 text-black font-medium transition-all"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-sky-400 hover:text-sky-400 transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
