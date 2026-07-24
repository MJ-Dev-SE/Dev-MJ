export default function AboutSection() {
  const facts = [
    { label: "Based in", value: "Manila, Philippines" },
    { label: "Focus", value: "Web & Mobile Development" },
    { label: "Status", value: "Available for projects" },
  ];

  return (
    <section
      id="about"
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-clay-600">
          About Me
        </p>
        <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
          A bit about how I work
        </h2>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-relaxed text-stone-600">
        I'm a software developer who enjoys building clean systems,
        brainstorming solutions, and continuously improving my skills. I
        focus on React, TypeScript, and modern web tools.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {facts.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-beige-200 bg-beige-50 px-5 py-4 text-center shadow-sm"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay-600">
              {item.label}
            </p>
            <p className="mt-1 font-semibold text-stone-800">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
