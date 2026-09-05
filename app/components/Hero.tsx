'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Image from 'next/image'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'MERN Stack Developer',
  'AI Integration Specialist',
  'Freelance Web Developer',
]

const techBadges = ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB']

const nebulae = [
  { color: '#4c1d95', x: '-10%', y: '10%',  w: 600, h: 500, delay: 0 },
  { color: '#1e3a8a', x: '60%',  y: '-5%',  w: 550, h: 450, delay: 2 },
  { color: '#701a75', x: '30%',  y: '55%',  w: 500, h: 400, delay: 1 },
  { color: '#0e7490', x: '75%',  y: '55%',  w: 400, h: 350, delay: 3 },
]

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}


// ─── Star field ───────────────────────────────────────────────────────────────
function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 130 }, (_, id) => ({
        id,
        x:        Math.random() * 100,
        y:        Math.random() * 100,
        size:     Math.random() * 1.8 + 0.4,
        duration: Math.random() * 3 + 2,
        delay:    Math.random() * 6,
        opacity:  Math.random() * 0.55 + 0.2,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.15, s.opacity], scale: [1, 1.6, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Profile orb ──────────────────────────────────────────────────────────────
function ProfileOrb() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Outer pulsing glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 360, height: 360,
          background: 'radial-gradient(circle, #a855f720 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer orbit ring */}
      <motion.div
        className="absolute"
        style={{ width: 310, height: 310 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-2.5 h-2.5 rounded-full bg-[#a855f7]"
            style={{
              top:  '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(150px) translateY(-50%)`,
              boxShadow: '0 0 8px #a855f7, 0 0 16px #a855f750',
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full border border-[#a855f730]"
          style={{ borderStyle: 'dashed' }}
        />
      </motion.div>

      {/* Inner orbit ring */}
      <motion.div
        className="absolute"
        style={{ width: 240, height: 240 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {[45, 165, 285].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-[#00d2ff]"
            style={{
              top:  '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(120px) translateY(-50%)`,
              boxShadow: '0 0 6px #00d2ff, 0 0 12px #00d2ff50',
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full border border-[#00d2ff25]"
          style={{ borderStyle: 'dashed' }}
        />
      </motion.div>

      {/* Profile image container */}
      <motion.div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 185, height: 185,
          padding: 3,
          background: 'linear-gradient(135deg, #00d2ff, #a855f7, #701a75)',
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#0f1f3d] relative">
          <Image
            src="/profile_picture.png"
            alt="Usama Asif — Full-Stack Developer & AI Integration Specialist"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute z-20 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0a1628] border border-[#00d2ff40] text-[#00d2ff]"
        style={{ top: '8%', right: '3%' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        ⚡ AI Expert
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute z-20 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0a1628] border border-[#a855f740] text-[#a855f7]"
        style={{ bottom: '10%', left: '3%' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        🌐 Web Dev
      </motion.div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed]  = useState('')
  const [typing, setTyping]         = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%',  '25%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%',  '15%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex]
    let t: ReturnType<typeof setTimeout>
    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
      } else {
        t = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(t)
  }, [displayed, typing, roleIndex])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 40% 60%, #0f0728 0%, #030712 60%)' }}
    >
      {/* Parallax background layer */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {/* Nebula blobs */}
        {nebulae.map((n, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: n.x, top: n.y,
              width: n.w, height: n.h,
              background: `radial-gradient(circle, ${n.color}55 0%, ${n.color}10 50%, transparent 75%)`,
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 7 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
          />
        ))}

        {/* Star field */}
        <StarField />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24"
        style={{ y: textY, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── Left: text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d2ff30] bg-[#00d2ff0a] text-[#00d2ff] text-xs font-semibold tracking-wide">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Available for new projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="mb-3">
              <p className="text-slate-400 text-lg font-medium">Hi, I&apos;m</p>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-4"
            >
              <span className="text-white">Usama</span>
              <br />
              <span
                className="gradient-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00d2ff 0%, #a855f7 50%, #ec4899 100%)',
                }}
              >
                Asif
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 h-10 mb-5">
              <span className="text-xl md:text-2xl font-semibold text-[#00d2ff]">{displayed}</span>
              <motion.span
                className="inline-block w-[2px] h-6 bg-[#00d2ff] rounded-full"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-base leading-relaxed max-w-lg mb-8"
            >
              BS Computer Science graduate from the University of Gujrat. I build
              fast, scalable web apps with React & Next.js and integrate AI into
              real products — from chatbots to intelligent image editors.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="#projects"
                className="px-7 py-3.5 rounded-full font-semibold text-white text-sm glow-teal"
                style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px #00d2ff60' }}
                whileTap={{ scale: 0.96 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-7 py-3.5 rounded-full border border-[#ffffff20] text-slate-200 font-semibold text-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: '#00d2ff', color: '#00d2ff' }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.a>
            </motion.div>

            {/* Tech badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-[#0a0f2a80] border border-[#ffffff12] text-slate-400 text-xs font-mono"
                  whileHover={{ borderColor: '#00d2ff60', color: '#00d2ff', scale: 1.05 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: profile ── */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center"
            style={{ minHeight: 400 }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileOrb />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-[10px] uppercase tracking-widest"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
