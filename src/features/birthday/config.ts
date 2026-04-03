/**
 * Integration points — swap these for your real celebration content.
 *
 * Audio: place files under `public/birthday/audio/` and set paths below.
 * If a path is empty, playback for that scene is skipped (no errors in dev).
 *
 * Images: finale hero under `public/birthday/images/` or use any absolute URL.
 */

export const birthdayConfig = {
  /** Shown in the typewriter heading: `Happy Birthday {celebrantName}` */
  celebrantName: "Adetoro",

  /** Short line under the heading on the intro page */
  introSubline:
    "Twenty-one little reminders that the love you show to the people around you has not gone unnoticed.",

  /** Closing copy on the finale page */
  finaleMessage:
    "You have a gigantic heart, Oyindamola. And all these people are proof of that. You deserve everything you want in this world and beyond. Happy Birthdayyyy, our superstar.",

  /**
   * Prominently displayed on the finale page.
   * Replace with `/birthday/images/finale-hero.jpg` once the file exists in `public/`.
   */
  finaleHeroImageSrc: "/birthday/images/oyin.jpeg",

  /** 0-based story index where each stories-phase song starts (after 1-based stories 7 & 14). */
  storyAudio: {
    block2FromIndex: 7,
    block3FromIndex: 14,
  } as const,

  audio: {
    intro: "/birthday/audio/intro.mp3",
    storiesBlock1: "/birthday/audio/stories-1.mp3",
    storiesBlock2: "/birthday/audio/stories-2.mp3",
    storiesBlock3: "/birthday/audio/stories-3.mp3",
    finale: "/birthday/audio/outro.mp3",
  },
} as const
