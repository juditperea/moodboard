// lista de fotos. se usara una para el feed y otra para mi perfil. 
// tiene que poder aceptar los 3 diferentes tipos de layout
import ImageCard from "./ImageCard"
import type Image from "../components/Image"

type ImageGalleryProps = {
  images: Image[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    //ahora elegimos un grid sencillo pero luego fuera de aqui haremos la logica
    //para cambiar el layout con un boton
    <div className="grid grid-cols-5 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
        />
      ))}
    </div>
  )
}