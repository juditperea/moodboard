export default interface Image {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  avg_color: string
  src: {
    original: string
    large: string
    medium: string
    small: string
  }
  alt: string
}