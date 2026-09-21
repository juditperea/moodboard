//la imagen se añadira a nuestro perfi si estamos loggeados
//Cambiar el corazon por un simbolo y hacer animacion cuando se le haga clic y se guarde,
//cambiar estilos de hover. Al hacer doble click aparecera una animacion de un corazon y se guarda tb


import type Image from "./Image"
import { useFavorites } from "../context/FavoritesContext"

type ImageCardProps = {
  image: Image
  variant?: "natural" | "cropped"
  imageSizes?: string
}

export default function ImageCard({ image, variant = "natural", imageSizes = "100vw" }: ImageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const imageIsFavorite = isFavorite(image.id)

  return (
    <div className={`group relative overflow-hidden border border-border bg-surface ${variant === "cropped" ? "aspect-[4/5]" : ""}`}>
      <img
        src={image.src.medium}
        srcSet={`${image.src.small} 130w, ${image.src.medium} 350w, ${image.src.large} 940w, ${image.src.original} ${image.width}w`}
        sizes={imageSizes}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={variant === "cropped" ? "h-full w-full object-cover" : "h-auto w-full object-cover"}
      />

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