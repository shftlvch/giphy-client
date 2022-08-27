import { PropsWithChildren } from "react"

export type PropsWithCN<T> = { className?: string } & T
export type PropsWithCNAndChildren<T> = PropsWithChildren<PropsWithCN<T>>

export type SearchRequest = PaginationRequest & {
  q: string
  rating?: Rating
  lang?: "en"
  random_id?: string
  bundle?: string
}

export type Rating = "g" | "pg" | "pg-13" | "r"

export type PaginationRequest = {
  limit?: number
  offset?: number
}

export type GIF = {
  id: string
  slug: string
  url: string
  bitly_url: string
  username: string
  title: string
  images: Images
  rating: Rating
}

export type ImageType =
  | "480w_still"
  | "downsized"
  | "downsized_large"
  | "downsized_medium"
  | "downsized_small"
  | "downsized_still"
  | "fixed_height"
  | "fixed_height_downsampled"
  | "fixed_height_small"
  | "fixed_height_small_still"
  | "fixed_height_still"
  | "fixed_width"
  | "fixed_width_downsampled"
  | "fixed_width_small"
  | "fixed_width_small_still"
  | "fixed_width_still"
  | "looping"
  | "original"
  | "original_mp4"
  | "original_still"
  | "preview"
  | "preview_gif"
  | "preview_webp"

export type Images = Record<ImageType, Image>
export type Image = {
  height: string
  size: string
  url: string
  width: string
}
