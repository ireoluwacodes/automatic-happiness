import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { normalizeGuess } from "@/features/birthday/utils/normalizeGuess"

import type { IRevealModalProps } from "./@types"

type TPhase = "guess" | "result"

export function RevealModal({
  open,
  onOpenChange,
  story,
  onCommitReveal,
  reducedMotion,
}: IRevealModalProps) {
  const [phase, setPhase] = useState<TPhase>("guess")
  const [guess, setGuess] = useState("")
  const [correct, setCorrect] = useState(false)

  const guessInputId = useId()
  const doneRef = useRef<HTMLButtonElement>(null)

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
  }

  useEffect(() => {
    if (open && phase === "result") {
      doneRef.current?.focus()
    }
  }, [open, phase])

  if (!story) {
    return null
  }

  const currentStory = story
  const displayAuthor =
    currentStory.displayName ?? currentStory.authorFirstName

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok =
      normalizeGuess(guess) ===
      normalizeGuess(currentStory.authorFirstName)
    setCorrect(ok)
    onCommitReveal(ok)
    setPhase("result")
  }

  function handleClose() {
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md gap-4" showCloseButton>
        <DialogHeader>
          <DialogTitle>Take a guess</DialogTitle>
          <DialogDescription className="sr-only">
            Enter the author&apos;s first name in lowercase, then submit.
          </DialogDescription>
        </DialogHeader>

        {phase === "guess" ? (
          <form onSubmit={handleSubmit} className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor={guessInputId} className="sr-only">
                First name
              </Label>
              <Input
                id={guessInputId}
                name="guess"
                autoFocus
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="type lowercase firstname here"
                value={guess}
                onChange={(ev) => setGuess(ev.target.value)}
                className="h-11 sm:h-8"
              />
            </div>
            <DialogFooter className="pt-2 sm:justify-stretch">
              <Button type="submit" className="h-11 w-full sm:h-8">
                Submit guess
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="grid gap-4">
            <p className="text-foreground text-sm leading-relaxed">
              {correct ? (
                <>
                  <span className="font-medium text-primary">Yes — you got it.</span>{" "}
                  This was from {displayAuthor}.
                </>
              ) : (
                <>
                  <span className="font-medium">A lovely try.</span> This one
                  was from {displayAuthor}.
                </>
              )}
            </p>
            <motion.div
              className="overflow-hidden rounded-none ring-1 ring-border/60"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={currentStory.contributorImage}
                alt={`${displayAuthor}'s photo`}
                className="aspect-[3/4] w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <DialogFooter className="pt-0 sm:justify-stretch">
              <Button
                ref={doneRef}
                type="button"
                className="h-11 w-full sm:h-8"
                onClick={handleClose}
              >
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
