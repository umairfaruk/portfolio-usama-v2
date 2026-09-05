'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

const navLinks = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact',  label: 'Contact' },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const mobileMenuVariants: Variants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.35, ease } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.25, ease } },
}

const linkVariants: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: 'easeOut' },
  }),
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeSection, setActive]  = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section on scroll
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''))
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 shrink-0 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold text-[#030712]"
              style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
            >
              U
            </div> 
            <span className="font-bold text-white text-sm tracking-wide group-hover:text-[#00d2ff] transition-colors duration-200">
              USAMA
              {/* <span className="text-[#00d2ff]">.</span>      */}
            </span>
          </a>

          {/* Desktop links — centered pill */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #00d2ff25, #a855f725)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/resume_usama.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Resume
            </a>
            <motion.a
              href="#contact"
              className="px-5 py-2 rounded-full text-sm font-semibold text-[#030712]"
              style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00d2ff50' }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile: status dot + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              Available
            </span>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.1] transition-all"
            >
              <motion.div
                animate={menuOpen ? 'open' : 'closed'}
                className="flex flex-col gap-[5px] w-4"
              >
                <motion.span
                  className="block h-[1.5px] w-full bg-current rounded-full origin-center"
                  variants={{ open: { rotate: 45, y: 6.5 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-[1.5px] w-full bg-current rounded-full"
                  variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[1.5px] w-full bg-current rounded-full origin-center"
                  variants={{ open: { rotate: -45, y: -6.5 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden bg-[#030712]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
                      />
                    )}
                  </motion.a>
                )
              })}

              {/* Mobile CTA */}
              <div className="pt-3 pb-1 flex gap-3">
                <a
                  href="/resume_usama.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 rounded-xl border border-white/[0.08] text-slate-400 text-sm font-medium hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-[#030712]"
                  style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
