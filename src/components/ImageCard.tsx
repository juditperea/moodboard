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
    <div className="group relative max-w-sm overflow-hidden rounded-lg">
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
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          bg-white text-black
          rounded-full
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