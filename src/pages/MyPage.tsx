import ImageGallery from "../components/ImageGallery";
import { useFavorites } from "../context/FavoritesContext";

function MyPage() {
  const { favorites } = useFavorites()

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">Collection // Saved</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Page</h1>
      </div>
      {favorites.length > 0 ? (
        <ImageGallery images={favorites} />
      ) : (
        <p className="border border-border bg-surface px-4 py-8 text-sm uppercase tracking-[0.14em] text-muted">No saved images yet.</p>
      )}
    </main>
  );
}

export default MyPage;