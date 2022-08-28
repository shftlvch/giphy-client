import { GIF } from "@/types"

export enum SEARCH_ACTIONS {
  SET_QUERY,
  RESET_ENTITIES,
  REQUEST_ENTITIES,
  REQUEST_MORE_ENTITIES,
  RECEIVE_PAGE
}

export type SearchState = {
  q: string
  isValidating: boolean
  pages?: GIF[][]
  size: number
  hasMore: boolean
}

type SearchAction = {
  type: SEARCH_ACTIONS
  payload?: any
}

export const initialSearchState = {
  q: "",
  isValidating: false,
  pages: undefined,
  size: 0,
  hasMore: false
} as SearchState

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  const { pages } = state
  switch (action.type) {
    case SEARCH_ACTIONS.SET_QUERY: {
      const { q } = action.payload as { q: string }
      return {
        ...state,
        q
      }
    }
    case SEARCH_ACTIONS.RESET_ENTITIES: {
      return {
        ...state,
        pages: undefined,
        size: 0,
        hasMore: false,
        isValidating: false
      }
    }
    case SEARCH_ACTIONS.REQUEST_ENTITIES: {
      return {
        ...state,
        pages: undefined,
        size: 0,
        hasMore: true,
        isValidating: true
      }
    }
    case SEARCH_ACTIONS.RECEIVE_PAGE: {
      const { gifs, hasMore } = action.payload as {
        gifs: GIF[]
        hasMore: boolean
      }
      return {
        ...state,
        pages: pages && pages.length ? [...pages, gifs] : [gifs],
        hasMore,
        isValidating: false
      }
    }
    case SEARCH_ACTIONS.REQUEST_MORE_ENTITIES: {
      return {
        ...state,
        size: state.size + 1,
        isValidating: true
      }
    }
    default:
      throw new Error("Action key hasn't been specified")
  }
}

export default searchReducer
