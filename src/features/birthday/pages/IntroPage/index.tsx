import { useCallback, useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { TypewriterHeading } from "@/features/birthday/components/TypewriterHeading"
import { useBirthdayAudio } from "@/features/birthday/hooks/useBirthdayAudio"
import { birthdayConfig } from "@/features/birthday/config"

/** Mobile: large hero type; tuned so “Happy Birthday {name}” usually fits without clipping. */
const heroHeadingClassName =
  "font-heading text-balance w-full min-w-0 px-0.5 text-center font-semibold tracking-tight " +
  "leading-[1.08] sm:leading-[1.08] " +
  "text-[clamp(3.25rem,min(30vmin,calc(4.75rem+5.5vw)),7rem)] " +
  "sm:text-[clamp(3.25rem,min(15vmin,calc(4.5rem+4vw)),6.75rem)]"

export default function IntroPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { playScene, unlockAudio } = useBirthdayAudio()

  const [entranceDone, setEntranceDone] = useState(false)
  const [typingLineFinished, setTypingLineFinished] = useState(false)

  useEffect(() => {
    playScene("intro")
  }, [playScene])

  const handlePointerDownCapture = useCallback(() => {
    unlockAudio()
  }, [unlockAudio])

  const handleTypingComplete = useCallback(() => {
    setTypingLineFinished(true)
  }, [])

  const handleNext = useCallback(() => {
    navigate("/stories")
  }, [navigate])

  const typewriterActive = entranceDone || reduceMotion === true
  const introReady =
    (reduceMotion === true && typewriterActive) || typingLineFinished

  return (
    <div
      className="bg-background text-foreground flex min-h-svh flex-col"
      onPointerDownCapture={handlePointerDownCapture}
    >
      <div className="flex min-h-0 flex-1 flex-col px-3 pt-[max(0.5rem,env(safe-area-inset-top))] min-[380px]:px-4 sm:px-8 sm:pt-10">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-0 sm:py-4">
          <motion.div
            className="mx-auto flex w-full min-w-0 max-w-[min(100%,42rem)] flex-col items-center sm:max-w-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (!reduceMotion) {
                setEntranceDone(true)
              }
            }}
          >
            <TypewriterHeading
              celebrantName={birthdayConfig.celebrantName}
              active={typewriterActive}
              reducedMotion={reduceMotion === true}
              className={heroHeadingClassName}
              onTypingComplete={handleTypingComplete}
            />
          </motion.div>
        </div>

        <div className="mx-auto mt-auto flex w-full max-w-lg shrink-0 flex-col gap-3 px-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-6 sm:px-5 sm:pb-12">
          <motion.p
            className="text-muted-foreground text-center text-sm leading-relaxed sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={
              typewriterActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : 0.08,
              ease: "easeOut",
            }}
          >
            {birthdayConfig.introSubline}
          </motion.p>

          <motion.div
            className="flex flex-col gap-2 sm:gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={
              introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <p className="text-muted-foreground text-center text-[0.7rem] leading-snug sm:text-xs">
              Tap to start music.
            </p>
            <Button
              type="button"
              size="lg"
              className="h-12 w-full touch-manipulation sm:h-10"
              disabled={!introReady}
              onClick={handleNext}
            >
              Next
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
