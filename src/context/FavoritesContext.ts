import { createContext } from "react"
import type Image from "../components/Image"

export type FavoritesContextValue = {
  favorites: Image[]
  isFavorite: (imageId: number) => boolean
  toggleFavorite: (image: Image) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)