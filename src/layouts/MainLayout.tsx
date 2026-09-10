import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FavoritesProvider } from "../context/FavoritesContext";

function MainLayout() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <Outlet />
      </div>
    </FavoritesProvider>
  );
}

export default MainLayout;