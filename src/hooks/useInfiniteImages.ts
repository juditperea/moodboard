import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import type Image from "../components/Image"
import type { PaginatedImages } from "../services/api"

export type ImagePageLoader = (page: number) => Promise<PaginatedImages>

type UseInfiniteImagesResult = {
	images: Image[]
	page: number
	hasMore: boolean
	isInitialLoading: boolean
	isLoadingMore: boolean
	initialError: string | null
	loadMoreError: string | null
	sentinelRef: RefObject<HTMLDivElement | null>
	reset: () => void
	loadInitial: (loadPage: ImagePageLoader) => Promise<boolean>
	retryLoadMore: () => void
}

function appendUnique(currentImages: Image[], newImages: Image[]): Image[] {
	const existingIds = new Set(currentImages.map((image) => image.id))
	const uniqueImages = newImages.filter((image) => !existingIds.has(image.id))
	return uniqueImages.length > 0 ? [...currentImages, ...uniqueImages] : currentImages
}

export function useInfiniteImages(): UseInfiniteImagesResult {
	const [images, setImages] = useState<Image[]>([])
	const [page, setPage] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [isInitialLoading, setIsInitialLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [initialError, setInitialError] = useState<string | null>(null)
	const [loadMoreError, setLoadMoreError] = useState<string | null>(null)
	const loaderRef = useRef<ImagePageLoader | null>(null)
	const requestIdRef = useRef(0)
	const pageRef = useRef(0)
	const hasMoreRef = useRef(true)
	const isLoadingRef = useRef(false)
	const loadMoreErrorRef = useRef<string | null>(null)
	const sentinelRef = useRef<HTMLDivElement | null>(null)

	function reset() {
		requestIdRef.current += 1
		pageRef.current = 0
		hasMoreRef.current = true
		loadMoreErrorRef.current = null
		setImages([])
		setPage(0)
		setHasMore(true)
		setInitialError(null)
		setLoadMoreError(null)
	}

	async function loadInitial(loadPage: ImagePageLoader): Promise<boolean> {
		reset()
		loaderRef.current = loadPage
		const requestId = requestIdRef.current
		isLoadingRef.current = true
		setIsInitialLoading(true)

		try {
			const result = await loadPage(1)
			if (requestId !== requestIdRef.current) return false

			pageRef.current = result.page
			hasMoreRef.current = result.hasMore
			setImages(appendUnique([], result.images))
			setPage(result.page)
			setHasMore(result.hasMore)
			return true
		} catch (requestError) {
			if (requestId !== requestIdRef.current) return false
			setInitialError(requestError instanceof Error ? requestError.message : "Unable to load images")
			return false
		} finally {
			if (requestId === requestIdRef.current) {
				isLoadingRef.current = false
				setIsInitialLoading(false)
			}
		}
	}

	const loadMore = useCallback(async () => {
		if (
			!loaderRef.current ||
			isLoadingRef.current ||
			!hasMoreRef.current ||
			loadMoreErrorRef.current
		) {
			return
		}

		const requestId = requestIdRef.current
		const nextPage = pageRef.current + 1
		isLoadingRef.current = true
		setIsLoadingMore(true)

		try {
			const result = await loaderRef.current(nextPage)
			if (requestId !== requestIdRef.current) return

			pageRef.current = result.page
			hasMoreRef.current = result.hasMore
			setImages((currentImages) => appendUnique(currentImages, result.images))
			setPage(result.page)
			setHasMore(result.hasMore)
		} catch (requestError) {
			if (requestId !== requestIdRef.current) return
			const message = requestError instanceof Error ? requestError.message : "Unable to load more images"
			loadMoreErrorRef.current = message
			setLoadMoreError(message)
		} finally {
			if (requestId === requestIdRef.current) {
				isLoadingRef.current = false
				setIsLoadingMore(false)
			}
		}
	}, [])

	function retryLoadMore() {
		if (!loadMoreErrorRef.current) return
		loadMoreErrorRef.current = null
		setLoadMoreError(null)
		void loadMore()
	}

	const loadMoreRef = useRef(loadMore)

	useEffect(() => {
		loadMoreRef.current = loadMore
	}, [loadMore])

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) loadMoreRef.current()
			},
			{ rootMargin: "400px" }
		)

		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [images.length, hasMore, loadMoreError])

	return {
		images,
		page,
		hasMore,
		isInitialLoading,
		isLoadingMore,
		initialError,
		loadMoreError,
		sentinelRef,
		reset,
		loadInitial,
		retryLoadMore,
	}
}