export interface ITypewriterHeadingProps {
  celebrantName: string
  /** When true, the typewriter effect runs (typically after entrance animation). */
  active: boolean
  /** Skip typing; show full line immediately. */
  reducedMotion: boolean
  className?: string
  onTypingComplete?: () => void
}
