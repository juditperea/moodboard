import { useEffect, useState, type ReactNode } from "react"
import type Image from "../components/Image"
import { FavoritesContext } from "./FavoritesContext"

const FAVORITES_STORAGE_KEY = "moodboard:favorites"

function loadFavorites(): Image[] {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!storedFavorites) return []

    const parsedFavorites: unknown = JSON.parse(storedFavorites)
    if (!Array.isArray(parsedFavorites)) return []

    const favoritesById = new Map<number, Image>()
    for (const favorite of parsedFavorites) {
      if (
        typeof favorite === "object" &&
        favorite !== null &&
        "id" in favorite &&
        typeof favorite.id === "number" &&
        "url" in favorite &&
        typeof favorite.url === "string"
      ) {
        favoritesById.set(favorite.id, favorite as Image)
      }
    }

    return Array.from(favoritesById.values())
  } catch {
    return []
  }
}

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Image[]>(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Keep favorites available when browser storage is unavailable.
    }
  }, [favorites])

  function isFavorite(imageId: number) {
    return favorites.some((favorite) => favorite.id === imageId)
  }

  function toggleFavorite(image: Image) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.id === image.id)) {
        return currentFavorites.filter((favorite) => favorite.id !== image.id)
      }

      return [...currentFavorites, image]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}