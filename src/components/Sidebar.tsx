import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    // { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Certifications", to: "/certifications" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-amber-500/20 bg-slate-950/80 p-6 backdrop-blur-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-10 top-10 h-40 w-40 bg-amber-500/25 blur-[120px]" />
        <div className="absolute left-0 bottom-10 h-32 w-32 bg-sky-400/15 blur-[100px]" />
      </div>

      <div className="relative mb-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Mark Jerohm Castro
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-400/15 px-2 py-1 text-[11px] text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </span>
        </div>
        <p className="text-sm text-gray-400">React Developer - Manila</p>
      </div>

      <nav className="relative mb-8">
        <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">
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
                  className={`group relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
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

      <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.12),transparent_40%)]" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300">
                Project Slot
              </p>
              <p className="mt-1 text-base font-bold text-white">
                Want to build something?
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-200">
              Open
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-semibold text-slate-100">Web Apps</p>
              <p className="mt-1 text-slate-500">React UI, APIs</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="font-semibold text-slate-100">Mobile</p>
              <p className="mt-1 text-slate-500">React Native</p>
            </div>
          </div>

          <p className="mb-4 text-xs leading-relaxed text-slate-400">
            Send the idea, goal, or problem. I can help shape the interface,
            connect the data, and turn it into a working build.
          </p>
        </div>

        <NavLink
          to="/contact"
          onClick={toggleSidebar}
          className="relative inline-flex w-full justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
        >
          Start a project
        </NavLink>
      </div>
    </aside>
  );
}
