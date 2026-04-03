import { useContext } from "react"

import type { IAudioContextValue } from "@/features/birthday/components/AudioProvider/@types"
import { BirthdayAudioContext } from "@/features/birthday/components/AudioProvider/birthday-audio-context"

export function useBirthdayAudio(): IAudioContextValue {
  const ctx = useContext(BirthdayAudioContext)
  if (!ctx) {
    throw new Error("useBirthdayAudio must be used within AudioProvider")
  }
  return ctx
}
