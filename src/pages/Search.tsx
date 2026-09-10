import { useState, type SubmitEventHandler  } from "react"
import ImageGallery from "../components/ImageGallery"
import type Image from "../components/Image"
import { searchImages } from "../services/api"

function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault()

  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    setError("Enter a search term. Example: 'nature', 'city', 'food'")
    setResults([])
    setHasSearched(false)
    return
  }

  setIsLoading(true)
  setError(null)
  setHasSearched(true)

  try {
    setResults(await searchImages(trimmedQuery))
  } catch (requestError) {
    setResults([])
    setError(
      requestError instanceof Error
        ? requestError.message
        : "Search failed"
    )
  } finally {
    setIsLoading(false)
  }
}
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">Archive // Search</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover</h1>
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
          disabled={isLoading}
          className="border border-accent bg-accent px-4 py-2 font-bold uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && <p className="px-1 py-4 text-sm uppercase tracking-[0.14em] text-muted">Loading images...</p>}
      {error && <p className="border border-accent px-4 py-3 text-sm text-accent">{error}</p>}
      {!isLoading && !error && hasSearched && results.length === 0 && (
        <p className="px-1 py-4 text-sm uppercase tracking-[0.14em] text-muted">No images found.</p>
      )}
      {!isLoading && !error && results.length > 0 && (
        <ImageGallery images={results} />
      )}
    </main>
  )
}

export default Search