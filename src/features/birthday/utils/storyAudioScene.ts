import { birthdayConfig } from "@/features/birthday/config"
import type { TAudioScene } from "@/features/birthday/types"

/** Maps 0-based story index to the correct stories-page track (not intro/finale). */
export function getStoriesAudioScene(storyIndex: number): TAudioScene {
  const { block2FromIndex, block3FromIndex } = birthdayConfig.storyAudio
  if (storyIndex >= block3FromIndex) {
    return "storiesBlock3"
  }
  if (storyIndex >= block2FromIndex) {
    return "storiesBlock2"
  }
  return "storiesBlock1"
}
