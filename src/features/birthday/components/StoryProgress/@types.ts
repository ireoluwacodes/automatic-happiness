export interface IStoryProgressProps {
  total: number
  activeIndex: number
  /** Per index: whether that story's contributor image has been revealed. */
  revealedAtIndex: readonly boolean[]
  className?: string
}
