import { PropsWithChildren } from "react"

export type PropsWithCN<T> = { className?: string } & T
export type PropsWithCNAndChildren<T> = PropsWithChildren<PropsWithCN<T>> 