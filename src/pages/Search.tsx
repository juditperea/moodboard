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
    setError("Enter a search term")
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
    <main className="min-h-screen">
      <h1 className="text-5xl font-bold">Search</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 p-6">
        <label htmlFor="image-search" className="sr-only">
          Search images
        </label>
        <input
          id="image-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search images"
          className="rounded-md px-4 py-2 text-black"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-white px-4 py-2 text-black disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && <p className="px-6">Loading images...</p>}
      {error && <p className="px-6 text-red-400">{error}</p>}
      {!isLoading && !error && hasSearched && results.length === 0 && (
        <p className="px-6">No images found.</p>
      )}
      {!isLoading && !error && results.length > 0 && (
        <ImageGallery images={results} />
      )}
    </main>
  )
}

export default Search