import type Image from "../components/Image"

type PexelsPhoto = {
	id: number
	width: number
	height: number
	url: string
	photographer: string
	photographer_url: string
	avg_color: string | null
	src: {
		original: string
		large: string
		medium: string
		small: string
	}
	alt: string | null
}

type PexelsSearchResponse = {
	photos: PexelsPhoto[]
}

function isPexelsPhoto(value: unknown): value is PexelsPhoto {
	if (typeof value !== "object" || value === null) return false

	const photo = value as Record<string, unknown>
	const source = photo.src
	if (typeof source !== "object" || source === null) return false

	const imageSources = source as Record<string, unknown>
	return (
		typeof photo.id === "number" &&
		typeof photo.width === "number" &&
		typeof photo.height === "number" &&
		typeof photo.url === "string" &&
		typeof photo.photographer === "string" &&
		typeof photo.photographer_url === "string" &&
		(typeof photo.avg_color === "string" || photo.avg_color === null) &&
		(typeof photo.alt === "string" || photo.alt === null) &&
		typeof imageSources.original === "string" &&
		typeof imageSources.large === "string" &&
		typeof imageSources.medium === "string" &&
		typeof imageSources.small === "string"
	)
}

function toImage(photo: PexelsPhoto): Image {
	return {
		id: photo.id,
		width: photo.width,
		height: photo.height,
		url: photo.url,
		photographer: photo.photographer,
		photographer_url: photo.photographer_url,
		avg_color: photo.avg_color ?? "",
		src: photo.src,
		alt: photo.alt ?? "",
	}
}

export async function searchImages(query: string): Promise<Image[]> {
	const apiKey = import.meta.env.VITE_PEXELS_API_KEY
	if (!apiKey) {
		throw new Error("Pexels API key is not configured")
	}

	const response = await fetch(
		`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}`,
		{
			headers: {
				Authorization: apiKey,
			},
		}
	)

	if (!response.ok) {
		throw new Error(`Pexels error: ${response.status}`)
	}

	const data: unknown = await response.json()
	if (
		typeof data !== "object" ||
		data === null ||
		!Array.isArray((data as Record<string, unknown>).photos)
	) {
		throw new Error("Invalid Pexels response")
	}

	const photos = (data as PexelsSearchResponse).photos
	return photos.filter(isPexelsPhoto).map(toImage)
}
