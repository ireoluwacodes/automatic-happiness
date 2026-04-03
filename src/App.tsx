import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AudioProvider } from "@/features/birthday/components/AudioProvider"
import { BirthdayShell } from "@/features/birthday/BirthdayShell"
import FinalePage from "@/features/birthday/pages/FinalePage"
import IntroPage from "@/features/birthday/pages/IntroPage"
import StoriesPage from "@/features/birthday/pages/StoriesPage"

export default function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <Routes>
          <Route path="/" element={<BirthdayShell />}>
            <Route index element={<IntroPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="finale" element={<FinalePage />} />
          </Route>
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  )
}
