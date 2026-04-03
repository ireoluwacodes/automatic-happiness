import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"

import type { IStoryNavigationProps } from "./@types"

export function StoryNavigation({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  showPrimaryNext,
  primaryNextLabel,
  onPrimaryNext,
}: IStoryNavigationProps) {
  return (
    <div className="flex w-full flex-col gap-3 pt-1">
      {showPrimaryNext && (
        <Button
          type="button"
          size="lg"
          className="h-12 w-full touch-manipulation shadow-sm sm:h-10"
          onClick={onPrimaryNext}
        >
          {primaryNextLabel}
        </Button>
      )}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="touch-manipulation"
          disabled={!canGoBack}
          onClick={onBack}
          aria-label="Previous story"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="touch-manipulation"
          disabled={!canGoForward}
          onClick={onForward}
          aria-label="Next story"
        >
          <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
