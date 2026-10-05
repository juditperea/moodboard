import type Image from "./Image"
import { useFavorites } from "../context/useFavorites"

type ImageCardProps = {
  image: Image
  variant?: "natural" | "cropped"
  imageSizes?: string
  onOpen: () => void
}

export default function ImageCard({ image, variant = "natural", imageSizes = "100vw", onOpen }: ImageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const imageIsFavorite = isFavorite(image.id)

  return (
    <div className={`group relative overflow-hidden border border-border bg-surface ${variant === "cropped" ? "aspect-[4/5]" : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open image details: ${image.alt || image.photographer}`}
        className="block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
      >
        <img
          src={image.src.medium}
          srcSet={`${image.src.small} 130w, ${image.src.medium} 350w, ${image.src.large} 940w, ${image.src.original} ${image.width}w`}
          sizes={imageSizes}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className={variant === "cropped" ? "h-full w-full object-cover" : "h-auto w-full object-cover"}
        />
      </button>

      <button
        onClick={() => toggleFavorite(image)}
        aria-pressed={imageIsFavorite}
        aria-label={imageIsFavorite ? "Remove from favorites" : "Add to favorites"}
        className="
          absolute top-3 right-3
          opacity-100 group-hover:opacity-100 focus-visible:opacity-100 sm:opacity-0
          transition-opacity duration-200
          border border-border-strong bg-surface-raised text-foreground
          w-12 h-12
          flex items-center justify-center
          cursor-pointer
        "
      >
        {imageIsFavorite ? "♥" : "♡"}
      </button>
    </div>
  )
}