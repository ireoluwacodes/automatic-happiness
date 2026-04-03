export interface IStoryNavigationProps {
  canGoBack: boolean
  canGoForward: boolean
  onBack: () => void
  onForward: () => void
  showPrimaryNext: boolean
  primaryNextLabel: string
  onPrimaryNext: () => void
}
