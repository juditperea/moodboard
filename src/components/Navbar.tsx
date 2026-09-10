import { NavLink } from "react-router-dom";
import { useTheme } from "../context/useTheme";

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="border-b border-border bg-surface/90 text-foreground backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
        <span className="mr-auto text-sm font-bold uppercase tracking-[0.22em] text-accent">
          Moodboard 
        </span>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-b-2 px-1 py-2 transition-colors ${isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `border-b-2 px-1 py-2 transition-colors ${isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"}`
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              `border-b-2 px-1 py-2 transition-colors ${isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"}`
            }
          >
            My Page
          </NavLink>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-pressed={theme === "dark"}
            className="ml-2 border border-border-strong bg-surface-raised px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;