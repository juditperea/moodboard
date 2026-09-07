import process from "process";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function getCuratedImages() {
  const response = await fetch("https://api.pexels.com/v1/curated", {
    method: "GET",
    headers: {
      Authorization: PEXELS_API_KEY ?? "",
    },
  })

  if (!response.ok) {
    throw new Error(`Pexels error: ${response.status}`)
  }

  const data = await response.json()

  return data.photos
}

//buscar imagenes

export async function searchImages(searchBar: string) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchBar)}`,
    {
      method: "GET",
      headers: {
        Authorization: PEXELS_API_KEY ?? "",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Pexels error: ${response.status}`);
  }

  const data = await response.json();

  return data.photos;
}