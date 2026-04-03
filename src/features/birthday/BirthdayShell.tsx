import { LazyMotion, domAnimation } from "framer-motion"
import { Outlet } from "react-router-dom"

export function BirthdayShell() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Outlet />
    </LazyMotion>
  )
}
