import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { FavoritesProvider } from "../context/FavoritesContext"
import { GalleryLayoutProvider } from "../context/GalleryLayoutContext"

function MainLayout() {
  return (
    <FavoritesProvider>
      <GalleryLayoutProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <Outlet />
        </div>
      </GalleryLayoutProvider>
    </FavoritesProvider>
  )
}

export default MainLayout