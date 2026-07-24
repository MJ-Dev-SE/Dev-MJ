type Props = {
  title: string;
  description: string;
  tech: string[];
  projectStatus?: string;
  timeline?: string;
  highlights?: string[];
  link?: string;
  ctaLabel?: string;
  links?: { label: string; url: string }[];
};

export default function ProjectCard({
  title,
  description,
  tech,
  projectStatus,
  timeline,
  highlights,
  link,
  ctaLabel,
  links,
}: Props) {
  const cardClass =
    "group relative overflow-hidden rounded-2xl border border-beige-300 p-6 bg-gradient-to-br from-white to-beige-50 hover:border-beige-500 hover:shadow-xl hover:shadow-beige-400/20 transition-all duration-300 cursor-default";

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const spotlight = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(280px circle at var(--x) var(--y), rgba(169,138,91,0.16), transparent 70%)",
      }}
    />
  );

  const statusRow = projectStatus || timeline ? (
    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-beige-700/90 mb-3">
      <span className="px-3 py-1 rounded-full border border-beige-400/50 bg-beige-100 text-beige-800">
        {projectStatus || "Status"}
      </span>
      {timeline && (
        <span className="text-beige-700/90 text-[0.65rem]">{timeline}</span>
      )}
    </div>
  ) : null;

  const content = (
    <>
      {statusRow}
      <h3 className="text-xl font-bold text-stone-800 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-stone-600 mt-3 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {tech.map((item) => (
          <span
            key={item}
            className="text-[0.65rem] px-3 py-1 rounded-full border border-beige-400/60 text-beige-800 bg-beige-100"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 h-1.5 w-full bg-beige-200 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-beige-500 to-beige-700" />
      </div>
      {highlights && highlights.length > 0 && (
        <ul className="mt-4 space-y-2 text-xs text-stone-600">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-beige-600" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div className={cardClass} onMouseMove={handleMouseMove}>
      {spotlight}
      <div className="relative z-10">
        {content}
        {links && links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-clay-400 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-clay-700 bg-clay-50 hover:bg-clay-700 hover:text-azure transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-clay-700 px-4 py-2 text-sm font-semibold tracking-[0.3em] uppercase text-azure hover:bg-clay-800 transition-colors duration-200"
          >
            {ctaLabel || "View live"}
          </a>
        )}
      </div>
    </div>
  );
}
