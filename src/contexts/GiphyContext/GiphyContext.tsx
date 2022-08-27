import { PAGE_SIZE } from "@/constants"
import { useDebounce } from "@/hooks/useDebounce"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react"

interface IGiphyContext {
  current: {
    set: (id?: string) => void
    gif: GIF | undefined
  }
  search: {
    q: string
    set: (q: string) => void
    isValidating: boolean
    result: GIF[] | undefined
    page: number
    nextPage: () => void
  }
}

export const GiphyContext = createContext<IGiphyContext>({
  current: {
    gif: undefined,
    set: () => {}
  },
  search: {
    q: "",
    isValidating: false,
    result: undefined,
    page: 1,
    set: () => {},
    nextPage: () => {}
  }
})

export const useGiphyContext = (): IGiphyContext => useContext(GiphyContext)

export const useCurrentContext = (): IGiphyContext["current"] =>
  useContext(GiphyContext).current

export const useSearchContext = (): IGiphyContext["search"] =>
  useContext(GiphyContext).search

export function GiphyContextProvider({
  children
}: PropsWithChildren<unknown>): JSX.Element {
  const [q, setQ] = useState<string>("")
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [result, setResult] = useState<GIF[]>()
  const debouncedQ = useDebounce<string>(q, 300)

  useEffect(() => {
    if (debouncedQ === "") {
      setResult(undefined)
      return
    }

    const args: SearchRequest = {
      q: debouncedQ,
      offset: 0,
      limit: PAGE_SIZE
    }

    async function search() {
      setIsValidating(true)
      const resp = await fetcher<GIF[]>({
        endpoint: "gifs/search",
        args
      })
      setResult(resp)
      setIsValidating(false)
    }
    search()
  }, [debouncedQ])

  const [currentId, setCurrentId] = useState<string>()
  const [gif, setGif] = useState<GIF>()
  useEffect(() => {
    if (!currentId || currentId === "") {
      setGif(undefined)
      return
    }

    async function fetch() {
      const resp = await fetcher<GIF>({
        endpoint: `gifs/${currentId}`
      })
      setGif(resp)
    }
    fetch()
  }, [currentId])

  return (
    <GiphyContext.Provider
      value={{
        current: {
          set: setCurrentId,
          gif
        },
        search: {
          q,
          set: setQ,
          isValidating,
          nextPage: () => {},
          page: 1,
          result
        }
      }}
    >
      {children}
    </GiphyContext.Provider>
  )
}
