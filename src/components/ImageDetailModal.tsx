import { useEffect, useRef } from "react"
import type Image from "./Image"
import { useFavorites } from "../context/useFavorites"

type ImageDetailModalProps = {
  image: Image
  onClose: () => void
}

export default function ImageDetailModal({ image, onClose }: ImageDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const { isFavorite, toggleFavorite } = useFavorites()
  const imageIsFavorite = isFavorite(image.id)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="image-detail-title"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 m-auto h-[calc(100dvh-1rem)] max-h-[900px] w-[calc(100%-1rem)] max-w-6xl overflow-hidden border border-border bg-surface p-0 text-foreground backdrop:bg-black/75 sm:h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)]"
    >
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">Image / Detail</p>
            <h2 id="image-detail-title" className="truncate text-sm font-semibold sm:text-base">
              {image.alt || "Image details"}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image details"
            className="flex size-11 shrink-0 items-center justify-center border border-border-strong bg-surface-raised text-xl leading-none hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
          >
            ×
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_18rem] md:overflow-hidden">
          <div className="flex min-h-[35vh] items-center justify-center bg-background p-3 sm:p-6 md:min-h-0">
            <img
              src={image.src.original}
              alt={image.alt}
              decoding="async"
              className="max-h-[55dvh] max-w-full object-contain md:max-h-full"
            />
          </div>

          <aside className="flex flex-col gap-5 border-t border-border p-4 sm:p-6 md:overflow-y-auto md:border-l md:border-t-0">
            <div>
              <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">Photographer</p>
              {image.photographer_url ? (
                <a
                  href={image.photographer_url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-words text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
                >
                  {image.photographer || "Unknown photographer"}
                </a>
              ) : (
                <p className="break-words text-sm">{image.photographer || "Unknown photographer"}</p>
              )}
            </div>

            <a
              href={image.url}
              target="_blank"
              rel="noreferrer"
              className="w-fit border-b border-accent pb-1 text-xs font-bold uppercase tracking-[0.14em] text-accent hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
            >
              View source
            </a>

            <button
              type="button"
              onClick={() => toggleFavorite(image)}
              aria-pressed={imageIsFavorite}
              aria-label={imageIsFavorite ? "Remove from favorites" : "Add to favorites"}
              className="flex min-h-12 w-full items-center justify-center gap-2 border border-border-strong bg-surface-raised px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
            >
              <span aria-hidden="true" className="text-xl">{imageIsFavorite ? "♥" : "♡"}</span>
              {imageIsFavorite ? "Saved" : "Save image"}
            </button>
          </aside>
        </div>
      </div>
    </dialog>
  )
}
