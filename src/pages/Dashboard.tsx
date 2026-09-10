import ImageGallery from "../components/ImageGallery"
import mockImages from "../data/mockImages"

function Dashboard() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">Feed // Inspiration </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Home</h1>
      </div>

      <ImageGallery images={mockImages} />
    </main>
  )
}

export default Dashboard