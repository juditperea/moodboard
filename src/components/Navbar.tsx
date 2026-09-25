import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "../context/useTheme"

const navigationItems = [
  { label: "DISCOVER", to: "/" },
  { label: "SEARCH", to: "/search" },
  { label: "MY PAGE", to: "/mypage" },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [isMenuOpen])

  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return [
      "border-b border-transparent px-1 py-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors",
      isActive ? "border-accent text-accent" : "text-muted hover:text-foreground",
    ].join(" ")
  }

  return (
    <header className="border-b border-border bg-surface/90 text-foreground backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-accent">
              Moodboard / 001
            </span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={getNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "dark"}
              className="border border-border-strong bg-surface-raised px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {theme === "dark" ? "LIGHT" : "THEME"}
            </button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-panel"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="border border-border-strong bg-surface-raised px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
            >
              Menu
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            id="mobile-navigation-panel"
            className="mt-4 border border-border bg-surface p-3 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `border px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-colors ${isActive ? "border-accent bg-accent text-accent-foreground" : "border-transparent text-foreground hover:border-accent hover:text-accent"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                aria-pressed={theme === "dark"}
                className="mt-1 border border-border-strong bg-surface-raised px-3 py-2 text-left text-[0.68rem] font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {theme === "dark" ? "LIGHT" : "THEME"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar