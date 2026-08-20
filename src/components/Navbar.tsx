import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-neutral-900 text-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : undefined
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : undefined
        }
      >
        Search
      </NavLink>

      <NavLink
        to="/mypage"
        className={({ isActive }) =>
          isActive ? "font-bold underline" : undefined
        }
      >
        My Page
      </NavLink>
    </nav>
  );
}

export default Navbar;