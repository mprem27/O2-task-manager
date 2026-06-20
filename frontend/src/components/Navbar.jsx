import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import logo from "../assets/logo.png";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const userName = user?.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="p-1 rounded-lg bg-blue-600/10 dark:bg-blue-900/20">
            <img 
              src={logo} 
              alt="Logo" 
              className={`h-8 w-8 object-contain ${theme === 'dark' ? 'brightness-110' : ''}`} 
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            O2H Manager
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          {userInitial}
        </span>
        <span className="max-w-32 truncate pr-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {userName}
        </span>
      </div>
    </header>
  );
};

export default Navbar;