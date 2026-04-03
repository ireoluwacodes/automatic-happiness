import type { TStory } from "@/features/birthday/types"

export interface IRevealModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  story: TStory | null
  onCommitReveal: (correct: boolean) => void
  reducedMotion: boolean
}
