import ImageCard from "./ImageCard"
import type Image from "../components/Image"
import GalleryLayoutSelector from "./GalleryLayoutSelector"
import { useGalleryLayout } from "../context/useGalleryLayout"

type ImageGalleryProps = {
  images: Image[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const { layout } = useGalleryLayout()
  const galleryClassName = layout === "masonry"
    ? "columns-1 gap-6 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
    : layout === "grid"
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      : "mx-auto flex w-full max-w-3xl flex-col gap-10"

  return (
    <>
      <GalleryLayoutSelector />
      <div className={`${galleryClassName} py-2`}>
        {images.map((image) => (
          <div
            key={image.id}
            className={layout === "masonry" ? "mb-6 break-inside-avoid" : undefined}
          >
            <ImageCard
              image={image}
              variant={layout === "grid" ? "cropped" : "natural"}
              imageSizes={layout === "feed"
                ? "(max-width: 768px) calc(100vw - 2rem), 768px"
                : layout === "masonry"
                  ? "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                  : "(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"}
            />
          </div>
        ))}
      </div>
    </>
  )
}