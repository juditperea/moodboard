//la imagen se añadira a nuestro perfi si estamos loggeados
//Cambiar el corazon por un simbolo y hacer animacion cuando se le haga clic y se guarde,
//cambiar estilos de hover. Al hacer doble click aparecera una animacion de un corazon y se guarda tb


import type Image from "./Image";
import { useFavorites } from "../context/FavoritesContext";

type ImageCardProps = {
  image: Image
}

export default function ImageCard({ image }: ImageCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const imageIsFavorite = isFavorite(image.id)

  return (
    <div className="group relative max-w-sm overflow-hidden border border-border bg-surface">
      <img
        src={image.src.medium}
        alt={image.alt}
        className="w-full h-auto object-cover"
      />

      <button
        onClick={() => toggleFavorite(image)}
        aria-label={imageIsFavorite ? "Remove from favorites" : "Add to favorites"}
        className="
          absolute top-3 right-3
          opacity-100 group-hover:opacity-100 sm:opacity-0
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