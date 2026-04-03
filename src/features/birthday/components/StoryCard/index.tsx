import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

import type { IStoryCardProps } from "./@types"

export function StoryCard({
  story,
  revealEntry,
  onRevealRequest,
  reducedMotion,
}: IStoryCardProps) {
  const revealed = revealEntry.revealed

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div
        className="bg-card ring-border/60 relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-none ring-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className="text-foreground/90 min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed tracking-wide sm:px-5 sm:py-5 sm:text-[0.9375rem]"
          tabIndex={0}
        >
          {story.writeup.split("\n").map((para, i) => (
            <p key={i} className={i === 0 ? "" : "mt-4"}>
              {para}
            </p>
          ))}
        </div>

        {!revealed && (
          <div className="border-border bg-background/95 supports-backdrop-filter:backdrop-blur-xs shrink-0 border-t px-4 py-3 sm:px-5">
            <Button
              type="button"
              size="lg"
              className="h-11 w-full touch-manipulation sm:h-9"
              onClick={onRevealRequest}
            >
              Reveal
            </Button>
          </div>
        )}
      </div>

      {revealed && (
        <motion.div
          className="relative overflow-hidden rounded-none ring-1 ring-border/60"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <img
            src={story.contributorImage}
            alt={
              story.displayName
                ? `Photo from ${story.displayName}`
                : "Contributor photo"
            }
            className="aspect-[3/4] w-full object-cover object-top sm:max-h-[min(40vh,320px)]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      )}
    </div>
  )
}
