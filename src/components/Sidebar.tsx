import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "Certifications", to: "/certifications" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <aside
      className={`w-72 bg-slate-950/80 backdrop-blur-xl border-r border-amber-500/20 p-6 fixed left-0 top-16 h-full z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-10 top-10 h-40 w-40 bg-amber-500/25 blur-[120px]" />
        <div className="absolute left-0 bottom-10 h-32 w-32 bg-sky-400/15 blur-[100px]" />
      </div>

      <div className="mb-8 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Mark Jerohm Castro
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-500/30">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </span>
        </div>
        <p className="text-sm text-gray-400">Full Stack Developer · Manila</p>
      </div>

      <nav className="mb-8 relative">
        <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
          Navigation
        </h3>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={toggleSidebar}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    active
                      ? "border-amber-400/60 bg-amber-500/10 text-white shadow-[0_10px_30px_rgba(251,191,36,0.12)]"
                      : "border-slate-800/60 bg-slate-900/60 text-slate-300 hover:border-amber-400/40 hover:bg-amber-500/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      active
                        ? "bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.18)]"
                        : "bg-slate-600 group-hover:bg-amber-300"
                    }`}
                  />
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.25em] text-slate-500 group-hover:text-amber-200">
                    {active ? "Now" : ""}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mb-6 relative">
        <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
          Stack Snapshot
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Tailwind",
            "Firebase",
            "Supabase",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-slate-900/70 border border-slate-700 text-xs px-3 py-1 rounded-full text-slate-200 hover:border-amber-400/50 hover:text-white transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.12),transparent_40%)]" />
        <p className="text-sm text-slate-200 font-semibold mb-2">
          Want to do a project?
        </p>
        <p className="text-xs text-slate-400 mb-4">
          Just send me an email—then we can dive into the details and make
          something awesome together!
        </p>
        <NavLink
          to="/contact"
          onClick={toggleSidebar}
          className="w-full inline-flex justify-center text-sm font-semibold px-4 py-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
        >
          Click this to email me!
        </NavLink>
      </div>
    </aside>
  );
}
