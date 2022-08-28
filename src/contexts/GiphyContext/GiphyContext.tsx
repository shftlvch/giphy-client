import { PAGE_SIZE } from "@/constants"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import { useCallback } from "react"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react"
import searchReducer, {
  initialSearchState,
  SearchState,
  SEARCH_ACTIONS
} from "./reducers/search"

interface IGiphyContext {
  current: {
    set: (id?: string) => void
    gif: GIF | undefined
  }
  search: {
    state: SearchState
    set: (q: string) => void
    nextPage: () => void
  }
}

export const GiphyContext = createContext<IGiphyContext>({
  current: {
    gif: undefined,
    set: () => {}
  },
  search: {
    state: initialSearchState,
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
  const [searchState, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchState
  )

  const fetchPage = useCallback(async () => {
    const args: SearchRequest = {
      q: searchState.q,
      offset: searchState.size * PAGE_SIZE,
      limit: PAGE_SIZE
    }
    const resp = await fetcher<GIF[]>({
      endpoint: "gifs/search",
      args
    })
    dispatchSearch({
      type: SEARCH_ACTIONS.RECEIVE_PAGE,
      payload: {
        gifs: resp,
        hasMore: resp.length === PAGE_SIZE
      }
    })
  }, [searchState.q, searchState.size])

  useEffect(() => {
    if (searchState.q === "") {
      return
    }
    fetchPage()
  }, [fetchPage])

  useEffect(() => {
    if (searchState.q === "") {
      dispatchSearch({
        type: SEARCH_ACTIONS.RESET_ENTITIES
      })
      return
    }
    dispatchSearch({
      type: SEARCH_ACTIONS.REQUEST_ENTITIES
    })
  }, [searchState.q])

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
          state: searchState,
          set: (q: string) =>
            dispatchSearch({
              type: SEARCH_ACTIONS.SET_QUERY,
              payload: { q }
            }),
          nextPage: () =>
            dispatchSearch({
              type: SEARCH_ACTIONS.REQUEST_MORE_ENTITIES
            })
        }
      }}
    >
      {children}
    </GiphyContext.Provider>
  )
}
