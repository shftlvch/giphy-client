import { PropsWithChildren } from "react"

export type PropsWithCN<T> = { className?: string } & T
export type PropsWithCNAndChildren<T> = PropsWithChildren<PropsWithCN<T>>

export type SearchRequest = PaginationRequest & {
  q: string
  rating?: "g" | "pg" | "pg-13" | "r"
  lang?: "en"
  random_id?: string
  bundle?: string
}

export type PaginationRequest = {
  limit?: number
  offset?: number
}
