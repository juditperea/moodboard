import ImageGallery from "../components/ImageGallery";
import { useFavorites } from "../context/FavoritesContext";

function MyPage() {
  const { favorites } = useFavorites()

  return (
    <main className="min-h-screen">
      <h1 className="text-5xl font-bold">My Page</h1>
      {favorites.length > 0 ? (
        <ImageGallery images={favorites} />
      ) : (
        <p className="p-6">No favorites yet.</p>
      )}
    </main>
  );
}

export default MyPage;