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
import currentReducer, {
  CurrentState,
  CURRENT_ACTIONS,
  initialCurrentState
} from "./reducers/current"
import searchReducer, {
  initialSearchState,
  SearchState,
  SEARCH_ACTIONS
} from "./reducers/search"

interface IGiphyContext {
  current: {
    state: CurrentState
    set: (id?: string) => void
  }
  search: {
    state: SearchState
    set: (q: string) => void
    nextPage: () => void
  }
}

export const GiphyContext = createContext<IGiphyContext>({
  current: {
    state: initialCurrentState,
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
  const [currentState, dispatchCurrent] = useReducer(
    currentReducer,
    initialCurrentState
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

  const fetchCurrent = useCallback(async () => {
    const resp = await fetcher<GIF>({
      endpoint: `gifs/${currentState.id}`
    })
    dispatchCurrent({
      type: CURRENT_ACTIONS.RECEIVE_ENTITY,
      payload: { gif: resp }
    })
  }, [currentState.id])

  useEffect(() => {
    if (!currentState.id || currentState.id === "") {
      dispatchCurrent({
        type: CURRENT_ACTIONS.RESET_ENTITY
      })
      return
    }
    fetchCurrent()
  }, [currentState.id])

  return (
    <GiphyContext.Provider
      value={{
        current: {
          set: (id?: string) =>
            dispatchCurrent({
              type: CURRENT_ACTIONS.SET_ID,
              payload: { id }
            }),
          state: currentState
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
