'use client'

import { useEffect } from 'react'
import { animate } from 'framer-motion'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const target = document.querySelector(href) as HTMLElement | null
      if (!target) return

      e.preventDefault()

      // 64px offset so the section clears the fixed navbar
      const targetY = target.getBoundingClientRect().top + window.scrollY - 64
      const distance = Math.abs(targetY - window.scrollY)

      // Scale duration with distance: fast for short hops, slower for full-page jumps
      const duration = Math.min(Math.max(distance / 2500, 0.45), 1.2)

      animate(window.scrollY, targetY, {
        duration,
        ease: [0.76, 0, 0.24, 1],
        onUpdate: (v) => window.scrollTo(0, v),
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <>{children}</>
}
