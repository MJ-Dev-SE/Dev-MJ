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
    "group relative rounded-2xl border border-slate-700 p-6 bg-gradient-to-br from-slate-950 to-slate-900 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 transition-all duration-300 cursor-default";

  const statusRow = projectStatus || timeline ? (
    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-amber-200/80 mb-3">
      <span className="px-3 py-1 rounded-full border border-amber-300/30 bg-amber-500/10 text-amber-100">
        {projectStatus || "Status"}
      </span>
      {timeline && (
        <span className="text-amber-200/90 text-[0.65rem]">{timeline}</span>
      )}
    </div>
  ) : null;

  const content = (
    <>
      {statusRow}
      <h3 className="text-xl font-bold text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-300 mt-3 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {tech.map((item) => (
          <span
            key={item}
            className="text-[0.65rem] px-3 py-1 rounded-full border border-amber-500/40 text-amber-100 bg-amber-500/10"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-amber-400 to-amber-500" />
      </div>
      {highlights && highlights.length > 0 && (
        <ul className="mt-4 space-y-2 text-xs text-slate-300">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div className={cardClass}>
      {content}
      {links && links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-amber-400/40 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-amber-200 bg-amber-500/10 hover:bg-amber-400 hover:text-black transition-colors duration-200"
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
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/60 px-4 py-2 text-sm font-semibold tracking-[0.3em] uppercase text-amber-100 hover:bg-amber-400 hover:text-black transition-colors duration-200"
        >
          {ctaLabel || "View live"}
        </a>
      )}
    </div>
  );
}
