import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

import type { IStoryProgressProps } from "./@types"

export function StoryProgress({
  total,
  activeIndex,
  revealedAtIndex,
  className,
}: IStoryProgressProps) {
  const reduceMotion = useReducedMotion()

  const label = useMemo(
    () =>
      `Story ${activeIndex + 1} of ${total}: ${revealedAtIndex[activeIndex] ? "revealed" : "in progress"}`,
    [activeIndex, revealedAtIndex, total]
  )

  return (
    <div
      className={cn("w-full px-1", className)}
      role="group"
      aria-label={label}
    >
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === activeIndex
          const isRevealed = revealedAtIndex[i] === true

          return (
            <motion.div
              key={i}
              className={cn(
                "h-1 min-w-0 flex-1 rounded-full",
                isRevealed ? "bg-primary/50" : "bg-muted",
                isActive && "ring-ring/60 bg-primary/90 ring-2"
              )}
              initial={false}
              animate={
                reduceMotion
                  ? undefined
                  : isActive
                    ? { scaleY: 1.25, opacity: 1 }
                    : { scaleY: 1, opacity: 1 }
              }
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              aria-hidden
            />
          )
        })}
      </div>
    </div>
  )
}
