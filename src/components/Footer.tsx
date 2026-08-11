const links = [
  { label: "Email", href: "mailto:markjerohm@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mark-jerohm-castro-68b3b03b7",
    external: true,
  },
  { label: "CV", href: "/resume.pdf", download: "Mark-Jerohm-Castro-CV.pdf" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-beige-200 bg-beige-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-sm text-stone-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Mark Jerohm Castro</p>

        <nav className="flex gap-5">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(item.download ? { download: item.download } : {})}
              className="relative transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-clay-500 after:transition-transform after:duration-200 hover:text-clay-700 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
