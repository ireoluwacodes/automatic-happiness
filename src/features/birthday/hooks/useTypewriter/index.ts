import { useEffect, useRef, useState } from "react"

import type { TUseTypewriterOptions } from "./@types"

export type { TUseTypewriterOptions } from "./@types"

export function useTypewriter(
  fullText: string,
  options: TUseTypewriterOptions = {}
) {
  const {
    msPerChar = 42,
    startDelay = 400,
    enabled = true,
    onComplete,
  } = options

  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    let intervalId: ReturnType<typeof setInterval> | undefined
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setCharCount((prev) => {
          const next = prev + 1
          if (next >= fullText.length) {
            if (intervalId !== undefined) {
              clearInterval(intervalId)
              intervalId = undefined
            }
            queueMicrotask(() => onCompleteRef.current?.())
            return fullText.length
          }
          return next
        })
      }, msPerChar)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalId !== undefined) {
        clearInterval(intervalId)
      }
    }
  }, [enabled, fullText, msPerChar, startDelay])

  if (!enabled) {
    return fullText
  }

  return fullText.slice(0, charCount)
}
