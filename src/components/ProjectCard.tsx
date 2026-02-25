type Props = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  links?: { label: string; url: string }[];
};

export default function ProjectCard({
  title,
  description,
  tech,
  link,
  links,
}: Props) {
  const cardClass =
    "group relative rounded-2xl border border-slate-700 p-6 bg-gradient-to-br from-slate-900 to-slate-800 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-400/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1";

  const content = (
    <>
      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 mt-3 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {tech.map((item) => (
          <span
            key={item}
            className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 text-gray-200 border border-slate-600 hover:bg-sky-500 hover:text-white transition-all duration-200"
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );

  if (links && links.length > 0) {
    return (
      <div className={`${cardClass} cursor-default`}>
        {content}
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-sky-400/40 px-3 py-2 text-sm text-sky-300 hover:bg-sky-400 hover:text-black transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}
