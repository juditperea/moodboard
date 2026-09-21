import { useEffect, useState, type ReactNode } from "react"
import { GalleryLayoutContext, type GalleryLayout } from "./useGalleryLayout"

const GALLERY_LAYOUT_STORAGE_KEY = "moodboard:layout"
const DEFAULT_LAYOUT: GalleryLayout = "masonry"

function isGalleryLayout(value: string | null): value is GalleryLayout {
  return value === "grid" || value === "masonry" || value === "feed"
}

function getInitialLayout(): GalleryLayout {
  try {
    const storedLayout = localStorage.getItem(GALLERY_LAYOUT_STORAGE_KEY)
    if (isGalleryLayout(storedLayout)) return storedLayout
  } catch {
    // Use the default layout when browser storage is unavailable.
  }

  return DEFAULT_LAYOUT
}

type GalleryLayoutProviderProps = {
  children: ReactNode
}

export function GalleryLayoutProvider({ children }: GalleryLayoutProviderProps) {
  const [layout, setLayout] = useState<GalleryLayout>(getInitialLayout)

  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_LAYOUT_STORAGE_KEY, layout)
    } catch {
      // Keep the selected layout available for the current session.
    }
  }, [layout])

  return (
    <GalleryLayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </GalleryLayoutContext.Provider>
  )
}
