export type TUseTypewriterOptions = {
  msPerChar?: number
  startDelay?: number
  /** When false, shows full text immediately (e.g. reduced motion). */
  enabled?: boolean
  onComplete?: () => void
}
