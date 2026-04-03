import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { RevealModal } from "@/features/birthday/components/RevealModal"
import { StoryCard } from "@/features/birthday/components/StoryCard"
import { StoryNavigation } from "@/features/birthday/components/StoryNavigation"
import { StoryProgress } from "@/features/birthday/components/StoryProgress"
import { useBirthdayAudio } from "@/features/birthday/hooks/useBirthdayAudio"
import {
  birthdayStories,
  birthdayStoryIds,
} from "@/features/birthday/data/stories"
import { useStoryRevealState } from "@/features/birthday/hooks/useStoryRevealState"
import { getStoriesAudioScene } from "@/features/birthday/utils/storyAudioScene"

const TOTAL = birthdayStories.length

export default function StoriesPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { playScene, unlockAudio } = useBirthdayAudio()

  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const { revealMap, reveal } = useStoryRevealState(birthdayStoryIds)

  const story = birthdayStories[index]
  const revealEntry =
    revealMap[story.id] ?? { revealed: false, lastGuessCorrect: null }

  useEffect(() => {
    unlockAudio()
  }, [unlockAudio])

  useEffect(() => {
    playScene(getStoriesAudioScene(index))
  }, [index, playScene])

  useEffect(() => {
    const neighbor = (i: number) => {
      if (i >= 0 && i < TOTAL) {
        const img = new Image()
        img.src = birthdayStories[i].contributorImage
      }
    }
    neighbor(index - 1)
    neighbor(index)
    neighbor(index + 1)
  }, [index])

  const revealedAtIndex = useMemo(
    () => birthdayStories.map((s) => revealMap[s.id]?.revealed ?? false),
    [revealMap]
  )

  const goBack = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const goForward = useCallback(() => {
    setIndex((i) => Math.min(TOTAL - 1, i + 1))
  }, [])

  const handlePrimaryNext = useCallback(() => {
    if (index < TOTAL - 1) {
      setIndex((i) => i + 1)
    } else {
      navigate("/finale")
    }
  }, [index, navigate])

  const handleCommitReveal = useCallback(
    (correct: boolean) => {
      reveal(story.id, correct)
    },
    [reveal, story.id]
  )

  const isLast = index === TOTAL - 1

  return (
    <div className="bg-background text-foreground flex max-h-svh min-h-svh flex-col overflow-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
      <header className="shrink-0 space-y-3 pb-3">
        <StoryProgress
          total={TOTAL}
          activeIndex={index}
          revealedAtIndex={revealedAtIndex}
        />
        <p className="text-muted-foreground text-center text-[0.65rem] font-medium tracking-[0.2em] uppercase sm:text-xs">
          Story {index + 1} of {TOTAL}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={story.id}
            className="flex min-h-0 flex-1 flex-col"
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <StoryCard
              story={story}
              revealEntry={revealEntry}
              onRevealRequest={() => setModalOpen(true)}
              reducedMotion={reduceMotion === true}
            />
          </motion.div>
        </AnimatePresence>

        <StoryNavigation
          canGoBack={index > 0}
          canGoForward={index < TOTAL - 1}
          onBack={goBack}
          onForward={goForward}
          showPrimaryNext={revealEntry.revealed}
          primaryNextLabel={
            isLast ? "Continue to the finale" : "Next story"
          }
          onPrimaryNext={handlePrimaryNext}
        />
      </div>

      <RevealModal
        key={`${story.id}-${modalOpen ? "open" : "shut"}`}
        open={modalOpen}
        onOpenChange={setModalOpen}
        story={story}
        onCommitReveal={handleCommitReveal}
        reducedMotion={reduceMotion === true}
      />
    </div>
  )
}
