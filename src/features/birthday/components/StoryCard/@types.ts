import type { TStory, TStoryRevealEntry } from "@/features/birthday/types"

export interface IStoryCardProps {
  story: TStory
  revealEntry: TStoryRevealEntry
  onRevealRequest: () => void
  reducedMotion: boolean
}
