import { useEffect, useRef, useState } from "react"
import ImageGallery from "../components/ImageGallery"
import type Image from "../components/Image"
import { searchImages, type PaginatedImages } from "../services/api"
import { useInfiniteImages } from "../hooks/useInfiniteImages"

const DISCOVERY_CONCEPTS = [
  "editorial fashion",
  "alternative fashion",
  "dark fashion",
  "gothic architecture",
  "brutalist architecture",
  "vintage japan",
  "tokyo night",
  "chrome aesthetic",
  "cyber y2k",
  "retro technology",
  "analog photography",
  "experimental photography",
  "cinematic photography",
  "flash photography",
  "dark interior",
  "industrial interior",
  "retro bedroom",
  "dark flowers",
  "foggy forest",
  "night city",
  "red lighting",
  "rainy night",
]

const DISCOVERY_IMAGES_PER_CONCEPT = 20
const DISCOVERY_CONCEPTS_PER_BATCH = 7

function shuffleConcepts(concepts: string[]) {
  let index = concepts.length - 1
  while (index > 0) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const concept = concepts[index]
    concepts[index] = concepts[swapIndex]
    concepts[swapIndex] = concept
    index -= 1
  }
  return concepts
}

function shuffleImages(images: Image[]) {
  let index = images.length - 1
  while (index > 0) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const image = images[index]
    images[index] = images[swapIndex]
    images[swapIndex] = image
    index -= 1
  }
  return images
}

function Dashboard() {
  const [concepts] = useState(() => shuffleConcepts([...DISCOVERY_CONCEPTS]))
  const conceptPoolRef = useRef([...concepts])
  const batchConceptsRef = useRef(new Map<number, string[]>())
  const hasStartedRef = useRef(false)

  const {
    images,
    hasMore,
    isInitialLoading,
    isLoadingMore,
    initialError,
    loadMoreError,
    sentinelRef,
    loadInitial,
    retryLoadMore,
  } = useInfiniteImages()

  useEffect(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const loadDiscoveryPage = async (batch: number) => {
      let batchConcepts = batchConceptsRef.current.get(batch)
      if (!batchConcepts) {
        if (conceptPoolRef.current.length < DISCOVERY_CONCEPTS_PER_BATCH) {
          conceptPoolRef.current = shuffleConcepts([...DISCOVERY_CONCEPTS])
        }

        batchConcepts = conceptPoolRef.current.splice(0, DISCOVERY_CONCEPTS_PER_BATCH)
        batchConceptsRef.current.set(batch, batchConcepts)
      }
      const results = await Promise.all(
        batchConcepts.map((concept) => searchImages(concept, 1, DISCOVERY_IMAGES_PER_CONCEPT))
      )
      const uniqueImages = new Map<number, Image>()

      for (const result of results) {
        for (const image of result.images) uniqueImages.set(image.id, image)
      }

      const combinedResult: PaginatedImages = {
        images: shuffleImages(Array.from(uniqueImages.values())),
        page: batch,
        hasMore: true,
      }

      return combinedResult
    }

    void loadInitial(loadDiscoveryPage)
  }, [concepts, loadInitial])

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">Feed // Inspiration </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Home</h1>
      </div>

      <section aria-live="polite" aria-busy={isInitialLoading || isLoadingMore} aria-label="Discovery images">
        {isInitialLoading && (
          <div className="grid grid-cols-2 gap-6 py-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4" aria-label="Loading discovery images">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="aspect-square animate-pulse border border-border bg-surface" />
            ))}
          </div>
        )}
        {initialError && <p className="border border-accent px-4 py-3 text-sm text-accent" role="alert">{initialError}</p>}
        {!isInitialLoading && !initialError && images.length === 0 && <p className="border border-border bg-surface px-4 py-8 text-sm uppercase tracking-[0.14em] text-muted">No discovery images found.</p>}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && loadMoreError && (
          <div className="flex flex-wrap items-center gap-3 border border-accent px-4 py-3 text-sm text-accent" role="alert">
            <span>{loadMoreError}</span>
            <button type="button" onClick={retryLoadMore} className="border border-accent px-3 py-2 font-bold uppercase tracking-[0.1em] hover:bg-accent hover:text-accent-foreground">
              Retry
            </button>
          </div>
        )}
        {images.length > 0 && isLoadingMore && <div className="h-8" aria-hidden="true" />}
        {images.length > 0 && hasMore && !loadMoreError && <div ref={sentinelRef} className="h-8" aria-hidden="true" />}
      </section>
    </main>
  )
}

export default Dashboard