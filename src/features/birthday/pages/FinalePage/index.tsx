import { useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { birthdayConfig } from "@/features/birthday/config"
import { useBirthdayAudio } from "@/features/birthday/hooks/useBirthdayAudio"

export default function FinalePage() {
  const reduceMotion = useReducedMotion()
  const { playScene, unlockAudio } = useBirthdayAudio()

  useEffect(() => {
    unlockAudio()
    playScene("finale")
  }, [playScene, unlockAudio])

  return (
    <div className="from-background via-muted/20 to-background flex min-h-svh flex-col bg-gradient-to-b px-5 py-10 sm:py-16">
      <motion.div
        className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 text-center"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="bg-card ring-border/50 w-full overflow-hidden rounded-none ring-1 shadow-sm"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={birthdayConfig.finaleHeroImageSrc}
            alt={`A favorite photo of ${birthdayConfig.celebrantName}`}
            className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <div className="flex flex-col gap-3 px-1">
          <motion.h1
            className="font-heading text-foreground text-xl font-medium tracking-tight sm:text-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : 0.32,
              ease: "easeOut",
            }}
          >
            With love, always
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-prose text-sm leading-relaxed sm:text-[0.9375rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : 0.42,
              ease: "easeOut",
            }}
          >
            {birthdayConfig.finaleMessage}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
