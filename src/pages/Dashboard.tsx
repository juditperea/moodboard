import ImageGallery from "../components/ImageGallery"
import mockImages from "../data/mockImages"

function Dashboard() {
  return (
    <main className="min-h-screen">
      <h1 className="text-5xl font-bold">Dashboard</h1>

      <ImageGallery images={mockImages} />
    </main>
  )
}

export default Dashboard