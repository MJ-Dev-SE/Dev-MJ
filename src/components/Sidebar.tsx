import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`w-64 bg-slate-900 border-r border-slate-800 p-6 fixed left-0 top-16 h-full z-40 ${isOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Mark Jerohm Castro</h2>
        </div>
        <p className="text-sm text-gray-400">Full Stack Developer</p>
      </div>

      <nav className="mb-8">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Navigation</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 rounded hover:bg-slate-800 text-gray-300 hover:text-white"
              onClick={toggleSidebar}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="block py-2 px-3 rounded hover:bg-slate-800 text-gray-300 hover:text-white"
              onClick={toggleSidebar}
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="block py-2 px-3 rounded hover:bg-slate-800 text-gray-300 hover:text-white"
              onClick={toggleSidebar}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-slate-800 text-xs px-2 py-1 rounded">React</span>
          <span className="bg-slate-800 text-xs px-2 py-1 rounded">
            Node.js
          </span>
          <span className="bg-slate-800 text-xs px-2 py-1 rounded">Python</span>
          <span className="bg-slate-800 text-xs px-2 py-1 rounded">
            Tailwind
          </span>
        </div>
      </div>
    </aside>
  );
}
