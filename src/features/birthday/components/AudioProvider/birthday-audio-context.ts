import { createContext } from "react"

import type { IAudioContextValue } from "./@types"

export const BirthdayAudioContext = createContext<IAudioContextValue | null>(
  null
)
