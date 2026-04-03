import type { TAudioScene } from "@/features/birthday/types"

export interface IAudioContextValue {
  /** Play the track for a scene; stops any current playback first. */
  playScene: (scene: TAudioScene) => void
  /** Call from a user gesture so autoplay policy allows playback. */
  unlockAudio: () => void
  audioUnlocked: boolean
}
