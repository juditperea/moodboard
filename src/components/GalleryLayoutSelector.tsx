import { useGalleryLayout, type GalleryLayout } from "../context/useGalleryLayout"

const LAYOUT_OPTIONS: Array<{ value: GalleryLayout; label: string; number: string }> = [
  { value: "grid", label: "Grid", number: "I" },
  { value: "masonry", label: "Masonry", number: "II" },
  { value: "feed", label: "Feed", number: "III" },
]

function LayoutIcon({ layout }: { layout: GalleryLayout }) {
  if (layout === "grid") {
    return (
      <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="size-2 border border-current" />
        ))}
      </span>
    )
  }

  if (layout === "masonry") {
    return (
      <span className="flex items-end gap-0.5" aria-hidden="true">
        <span className="h-4 w-1.5 border border-current" />
        <span className="h-2.5 w-1.5 border border-current" />
        <span className="h-3 w-1.5 border border-current" />
        <span className="h-2 w-1.5 border border-current" />
      </span>
    )
  }

  return (
    <span className="flex flex-col gap-1" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <span key={index} className="h-1 w-6 border border-current" />
      ))}
    </span>
  )
}

export default function GalleryLayoutSelector() {
  const { layout, setLayout } = useGalleryLayout()
  const selectedOption = LAYOUT_OPTIONS.find((option) => option.value === layout)

  return (
    <div className="mb-5 flex flex-wrap items-center justify-end gap-3 border-b border-border pb-3">
      <span className="mr-auto text-xs font-bold uppercase tracking-[0.16em] text-muted">
        View mode / {selectedOption?.number}
      </span>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Gallery layout">
        {LAYOUT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={`${option.label} layout`}
            title={`${option.label} layout`}
            aria-pressed={layout === option.value}
            onClick={() => setLayout(option.value)}
            className={`border px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong ${layout === option.value
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border-strong bg-surface text-foreground hover:border-accent hover:text-accent"}`}
          >
            <LayoutIcon layout={option.value} />
            <span className="text-[0.65rem] font-normal tracking-[0.08em] opacity-70">{option.number}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
