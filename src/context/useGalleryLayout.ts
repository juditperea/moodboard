import { createContext, useContext } from "react"

export type GalleryLayout = "grid" | "masonry" | "feed"

export type GalleryLayoutContextValue = {
  layout: GalleryLayout
  setLayout: (layout: GalleryLayout) => void
}

export const GalleryLayoutContext = createContext<GalleryLayoutContextValue | undefined>(undefined)

export function useGalleryLayout() {
  const context = useContext(GalleryLayoutContext)
  if (!context) {
    throw new Error("useGalleryLayout must be used inside GalleryLayoutProvider")
  }

  return context
}
