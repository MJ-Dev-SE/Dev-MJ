import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

type NavChild = { label: string; id: string };
type NavItem = { label: string; id: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  {
    label: "Experience",
    id: "experience",
    children: [
      { label: "Projects", id: "projects" },
      { label: "Certifications", id: "certifications" },
    ],
  },
  { label: "Contact", id: "contact" },
];

const allSectionIds = navItems.flatMap((item) => [
  item.id,
  ...(item.children?.map((child) => child.id) ?? []),
]);

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeId, setActiveId] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const sections = allSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMobile = () => setMobileOpen(false);

  const reduceMotion = useReducedMotion();

  // The brand is a `<Link to="/">`, and on a one-route site clicking it is a
  // no-op navigation — so it has to do the scrolling itself. Goes to the very
  // top rather than to `#home`, whose `scroll-mt-24` would leave it parked
  // under the header instead of showing the page from the start.
  const scrollToTop = () => {
    closeMobile();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Reading-progress line across the bottom edge of the header.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Active links are dark text on a light clay pill — never light text on a
  // light surface (see the readability rule in CLAUDE.md).
  const pillClass = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
      isHome && active
        ? "bg-clay-100 font-semibold text-clay-800"
        : "font-medium text-stone-600 hover:bg-beige-100 hover:text-clay-700"
    }`;

  const isItemActive = (item: NavItem) =>
    activeId === item.id ||
    (item.children?.some((child) => child.id === activeId) ?? false);

  return (
    <nav className="sticky top-0 z-40 border-b border-beige-200 bg-beige-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={scrollToTop}
          aria-label="Mark Jerohm Castro — back to top"
          className="group flex items-center gap-2.5 rounded-xl outline-none ring-clay-400 ring-offset-2 ring-offset-beige-50 focus-visible:ring-2"
        >
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-xl bg-clay-700 text-sm font-semibold text-azure"
            whileHover={{ rotate: -6, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            MJ
          </motion.span>
          <span className="hidden text-sm font-semibold tracking-tight text-stone-800 sm:inline">
            Mark Jerohm Castro
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.id} className="group relative">
                <a
                  href={`/#${item.id}`}
                  className={`${pillClass(isItemActive(item))} inline-flex items-center gap-1.5`}
                >
                  {item.label}
                  <svg
                    className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <div className="invisible absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="min-w-[180px] rounded-xl border border-beige-200 bg-beige-50 p-1.5 shadow-lg shadow-beige-900/5">
                    {item.children.map((child) => (
                      <a
                        key={child.id}
                        href={`/#${child.id}`}
                        className={`block ${pillClass(activeId === child.id)} !rounded-lg`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className={pillClass(isItemActive(item))}
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-stone-700 transition-colors hover:bg-beige-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
      </div>

      {/* Reading progress — sits on the header's bottom edge. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-clay-500"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {mobileOpen && (
        <div className="border-t border-beige-200 bg-beige-50 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={closeMobile}
                  className={`block ${pillClass(isItemActive(item))}`}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-beige-200 pl-3">
                    {item.children.map((child) => (
                      <a
                        key={child.id}
                        href={`/#${child.id}`}
                        onClick={closeMobile}
                        className={`block ${pillClass(activeId === child.id)}`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
