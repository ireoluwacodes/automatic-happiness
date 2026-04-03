import { useMemo } from "react"

import { useTypewriter } from "@/features/birthday/hooks/useTypewriter"

import type { ITypewriterHeadingProps } from "./@types"

function ColorfulChars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={`${i}-${char}`}
          className="birthday-hero-type-char"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </>
  )
}

function RunningTypewriterLine({
  fullText,
  onTypingComplete,
}: {
  fullText: string
  onTypingComplete?: () => void
}) {
  const typed = useTypewriter(fullText, {
    enabled: true,
    msPerChar: 105,
    startDelay: 480,
    onComplete: onTypingComplete,
  })

  const showCaret = typed.length < fullText.length

  return (
    <>
      <ColorfulChars text={typed} />
      {showCaret && (
        <span
          aria-hidden
          className="birthday-hero-type-char ml-0.5 inline-block animate-pulse font-light motion-reduce:animate-none"
          style={{ animationDelay: `${typed.length * 0.1}s` }}
        >
          |
        </span>
      )}
    </>
  )
}

export function TypewriterHeading({
  celebrantName,
  active,
  reducedMotion,
  className,
  onTypingComplete,
}: ITypewriterHeadingProps) {
  const fullText = useMemo(
    () => `Happy Birthday ${celebrantName}`,
    [celebrantName]
  )

  return (
    <h1
      className={
        className ??
        "font-heading text-foreground text-balance text-2xl leading-tight font-medium tracking-tight sm:text-3xl"
      }
    >
      {!active ? (
        ""
      ) : reducedMotion ? (
        <ColorfulChars text={fullText} />
      ) : (
        <RunningTypewriterLine
          key={fullText}
          fullText={fullText}
          onTypingComplete={onTypingComplete}
        />
      )}
    </h1>
  )
}
