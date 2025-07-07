import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TAB_BREAKPOINT = 960

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}

export function useIsTab() {
  const [isTab, setIsTab] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TAB_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTab(window.innerWidth < TAB_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTab(window.innerWidth < TAB_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isTab;
}
