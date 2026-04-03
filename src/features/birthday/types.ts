/**
 * Shared data model for the birthday microsite (not component prop types).
 */

/** Five moments: intro, three story segments (by index), finale. */
export type TAudioScene =
  | "intro"
  | "storiesBlock1"
  | "storiesBlock2"
  | "storiesBlock3"
  | "finale"

export type TStory = {
  id: string
  authorFirstName: string
  writeup: string
  /** Vite public path, remote URL, or imported asset URL */
  contributorImage: string
  /** Optional display label in UI (defaults to first name) */
  displayName?: string
}

export type TStoryRevealEntry = {
  revealed: boolean
  lastGuessCorrect: boolean | null
}

export type TStoryRevealMap = Record<string, TStoryRevealEntry>
