import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Component that scrolls to top of page on route change
 * Should be placed inside the Router but outside of Routes
 */
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTopOnNavigate
