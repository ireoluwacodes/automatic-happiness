import { useCallback, useReducer } from "react"

import type { TStoryRevealMap } from "@/features/birthday/types"

type TRevealAction = {
  type: "reveal"
  storyId: string
  correct: boolean
}

function revealReducer(
  state: TStoryRevealMap,
  action: TRevealAction
): TStoryRevealMap {
  switch (action.type) {
    case "reveal":
      return {
        ...state,
        [action.storyId]: {
          revealed: true,
          lastGuessCorrect: action.correct,
        },
      }
    default:
      return state
  }
}

function buildInitialRevealMap(storyIds: readonly string[]): TStoryRevealMap {
  return Object.fromEntries(
    storyIds.map((id) => [
      id,
      { revealed: false, lastGuessCorrect: null },
    ])
  )
}

export function useStoryRevealState(storyIds: readonly string[]) {
  const [map, dispatch] = useReducer(
    revealReducer,
    storyIds,
    buildInitialRevealMap
  )

  const reveal = useCallback((storyId: string, correct: boolean) => {
    dispatch({ type: "reveal", storyId, correct })
  }, [])

  return { revealMap: map, reveal }
}
