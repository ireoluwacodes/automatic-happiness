import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

import { birthdayConfig } from "@/features/birthday/config"
import type { TAudioScene } from "@/features/birthday/types"

import type { IAudioContextValue } from "./@types"
import { BirthdayAudioContext } from "./birthday-audio-context"

function sceneToSrc(scene: TAudioScene): string {
  switch (scene) {
    case "intro":
      return birthdayConfig.audio.intro
    case "storiesBlock1":
      return birthdayConfig.audio.storiesBlock1
    case "storiesBlock2":
      return birthdayConfig.audio.storiesBlock2
    case "storiesBlock3":
      return birthdayConfig.audio.storiesBlock3
    case "finale":
      return birthdayConfig.audio.finale
    default:
      return ""
  }
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUnlocked, setAudioUnlocked] = useState(false)
  const pendingSceneRef = useRef<TAudioScene | null>(null)
  const activeSceneRef = useRef<TAudioScene | null>(null)

  useEffect(() => {
    const el = new Audio()
    el.preload = "auto"
    el.loop = true
    audioRef.current = el
    return () => {
      el.pause()
      el.src = ""
      audioRef.current = null
    }
  }, [])

  const tryPlay = useCallback((scene: TAudioScene) => {
    const el = audioRef.current
    if (!el) {
      return
    }

    const src = sceneToSrc(scene)
    if (!src || src.trim() === "") {
      el.pause()
      el.removeAttribute("src")
      activeSceneRef.current = null
      pendingSceneRef.current = null
      return
    }

    el.pause()
    el.src = src
    el.load()

    void el
      .play()
      .then(() => {
        activeSceneRef.current = scene
        pendingSceneRef.current = null
      })
      .catch(() => {
        activeSceneRef.current = null
        pendingSceneRef.current = scene
      })
  }, [])

  const playScene = useCallback(
    (scene: TAudioScene) => {
      if (!audioRef.current) {
        return
      }
      if (activeSceneRef.current === scene) {
        return
      }
      pendingSceneRef.current = scene
      if (!audioUnlocked) {
        return
      }
      tryPlay(scene)
    },
    [audioUnlocked, tryPlay]
  )

  const unlockAudio = useCallback(() => {
    setAudioUnlocked(true)
  }, [])

  useEffect(() => {
    if (!audioUnlocked) {
      return
    }
    const pending = pendingSceneRef.current
    if (pending != null) {
      tryPlay(pending)
    }
  }, [audioUnlocked, tryPlay])

  useEffect(() => {
    const retryPending = () => {
      const pending = pendingSceneRef.current
      if (pending == null || !audioUnlocked) {
        return
      }
      tryPlay(pending)
    }
    document.addEventListener("pointerdown", retryPending, { capture: true })
    return () => {
      document.removeEventListener("pointerdown", retryPending, { capture: true })
    }
  }, [audioUnlocked, tryPlay])

  const value = useMemo<IAudioContextValue>(
    () => ({
      playScene,
      unlockAudio,
      audioUnlocked,
    }),
    [playScene, unlockAudio, audioUnlocked]
  )

  return (
    <BirthdayAudioContext.Provider value={value}>
      {children}
    </BirthdayAudioContext.Provider>
  )
}
