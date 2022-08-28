import { GIF } from "@/types"

export enum CURRENT_ACTIONS {
  SET_ID,
  RESET_ENTITY,
  RECEIVE_ENTITY
}

export type CurrentState = {
  id?: string
  gif?: GIF
}

type CurrentAction = {
  type: CURRENT_ACTIONS
  payload?: any
}

export const initialCurrentState = {
  id: undefined,
  gif: undefined
} as CurrentState

function currentReducer(
  state: CurrentState,
  action: CurrentAction
): CurrentState {
  switch (action.type) {
    case CURRENT_ACTIONS.SET_ID: {
      const { id } = action.payload as {
        id: string
      }
      return {
        ...state,
        id
      }
    }
    case CURRENT_ACTIONS.RECEIVE_ENTITY: {
      const { gif } = action.payload as {
        gif: GIF
      }
      return {
        ...state,
        gif
      }
    }
    case CURRENT_ACTIONS.RESET_ENTITY: {
      return {
        ...state,
        gif: undefined
      }
    }
    default:
      throw new Error("Action key hasn't been specified")
  }
}

export default currentReducer
