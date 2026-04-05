import { LazyMotion, domAnimation } from "framer-motion"
import { Outlet } from "react-router-dom"

export function BirthdayShell() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Outlet />
      <footer
        className="text-muted-foreground pointer-events-none fixed bottom-0 left-0 right-0 z-10 pb-[max(0.35rem,env(safe-area-inset-bottom))] text-center text-[0.5625rem] leading-tight tracking-wide opacity-60 sm:text-[0.625rem]"
      >
        an ireoluwa.ssh production
      </footer>
    </LazyMotion>
  )
}
