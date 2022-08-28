import { PAGE_SIZE } from "@/constants"
import { GIF, SearchRequest } from "@/types"
import fetcher from "@/utils/fetcher"
import { useCallback } from "react"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer
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

/**
 * We can add chaching for each request here
 */
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

/**
 * Base context
 */
export const useGiphyContext = (): IGiphyContext => useContext(GiphyContext)

/**
 * Context for the Detail vew
 */
export const useCurrentContext = (): IGiphyContext["current"] =>
  useContext(GiphyContext).current

/**
 * Context for the Search vew
 */
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

  /**
   * Querying search endpoint from the GIPHY API
   */
  const fetchPage = useCallback(async () => {
    if (searchState.q === "") {
      return
    }
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

  /**
   * Executing the callback (search endpoint) on changes
   */
  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  /**
   * Side-effects when query string changes
   */
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

  /**
   * Querying get-by-id endpoint from the GIPHY API
   */
  const fetchCurrent = useCallback(async () => {
    if (!currentState.id || currentState.id === "") {
      dispatchCurrent({
        type: CURRENT_ACTIONS.RESET_ENTITY
      })
      return
    }
    const resp = await fetcher<GIF>({
      endpoint: `gifs/${currentState.id}`
    })
    dispatchCurrent({
      type: CURRENT_ACTIONS.RECEIVE_ENTITY,
      payload: { gif: resp }
    })
  }, [currentState.id])

  /**
   * Handling current id changes
   */
  useEffect(() => {
    fetchCurrent()
  }, [fetchCurrent])

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
