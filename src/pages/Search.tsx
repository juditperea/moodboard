import { useState, type SubmitEventHandler } from "react"
import ImageGallery from "../components/ImageGallery"
import { searchImages } from "../services/api"
import { useInfiniteImages } from "../hooks/useInfiniteImages"

function Search() {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const suggestedQueries = ["Nature", "Architecture", "Night", "Texture"]
  const {
    images,
    hasMore,
    isInitialLoading,
    isLoadingMore,
    initialError,
    loadMoreError,
    sentinelRef,
    reset,
    loadInitial,
    retryLoadMore,
  } = useInfiniteImages()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      reset()
      setSubmittedQuery("")
      setHasSearched(false)
      return
    }

    setHasSearched(true)
    const loaded = await loadInitial((page) => searchImages(trimmedQuery, page))
    if (loaded) setSubmittedQuery(trimmedQuery)
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">ARCHIVE // SEARCH</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Search</h1>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3 border border-border bg-surface p-4 sm:flex-row">
        <label htmlFor="image-search" className="sr-only">
          Search new images
        </label>
        <input
          id="image-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search images"
          className="min-w-0 flex-1 border border-border bg-surface-raised px-4 py-2 text-foreground placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={isInitialLoading}
          className="border border-accent bg-accent px-4 py-2 font-bold uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isInitialLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {!hasSearched && !isInitialLoading && !initialError && (
        <section className="border border-border bg-surface px-4 py-6 sm:px-6" aria-labelledby="search-intro">
          <p id="search-intro" className="mb-4 text-sm text-muted">
            Search by subject, mood, or place.
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((suggestedQuery) => (
              <button
                key={suggestedQuery}
                type="button"
                onClick={() => setQuery(suggestedQuery)}
                className="border border-border-strong px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {suggestedQuery}
              </button>
            ))}
          </div>
        </section>
      )}

      <section
        aria-live="polite"
        aria-busy={isInitialLoading || isLoadingMore}
        aria-label="Search results"
      >
        {isInitialLoading && <p className="px-1 py-4 text-sm uppercase tracking-[0.14em] text-muted" role="status">Loading images...</p>}
        {initialError && <p className="border border-accent px-4 py-3 text-sm text-accent" role="alert">{initialError}</p>}
      {!isInitialLoading && !initialError && hasSearched && images.length === 0 && (
        <p className="px-1 py-4 text-sm uppercase tracking-[0.14em] text-muted">No images found.</p>
      )}
      {!isInitialLoading && !initialError && images.length > 0 && (
        <>
          <div className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg font-bold">Results for “{submittedQuery}”</h2>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{images.length} images</p>
          </div>
          <ImageGallery images={images} />
          {loadMoreError && (
            <div className="flex flex-wrap items-center gap-3 border border-accent px-4 py-3 text-sm text-accent" role="alert">
              <span>{loadMoreError}</span>
              <button type="button" onClick={retryLoadMore} className="border border-accent px-3 py-2 font-bold uppercase tracking-[0.1em] hover:bg-accent hover:text-accent-foreground">
                Retry
              </button>
            </div>
          )}
          {isLoadingMore && <p className="px-1 py-4 text-sm uppercase tracking-[0.14em] text-muted" role="status">Loading more images...</p>}
          {hasMore && !loadMoreError && <div ref={sentinelRef} className="h-8" aria-hidden="true" />}
        </>
      )}
      </section>
    </main>
  )
}

export default Search