'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Editro — AI Image Editor',
    description:
      'Final Year Project. An AI-powered image editing web application with intelligent tools for background removal, enhancement, and style transfer using computer vision.',
    tags: ['React.js', 'Python', 'OpenCV', 'Neural Networks', 'Node.js'],
    gradientFrom: '#00d2ff',
    gradientTo: '#a855f7',
    icon: '🎨',
    category: 'Final Year Project',
    badge: 'FYP',
  },
  {
    title: 'E-Commerce Website',
    description:
      'Full-stack e-commerce platform with product catalog, shopping cart, user authentication, and secure Stripe payment integration. Built with the MERN stack.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe'],
    gradientFrom: '#a855f7',
    gradientTo: '#ec4899',
    icon: '🛒',
    category: 'Web Development',
    badge: null,
  },
  {
    title: 'Solatis AI',
    description:
      'AI-powered meeting and communication platform featuring real-time collaboration, smart scheduling, and AI-assisted meeting summaries. Built with modern tooling.',
    tags: ['Next.js', 'TypeScript', 'Shadcn/UI', 'AI Integration', 'Web Sockets'],
    gradientFrom: '#10b981',
    gradientTo: '#00d2ff',
    icon: '🤝',
    category: 'AI + Web App',
    badge: null,
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="py-28 px-6 relative bg-[#040913]">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#00d2ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#00d2ff] font-mono text-xs uppercase tracking-[0.3em] mb-3">What I&apos;ve Built</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm">
            Real projects I&apos;ve designed and shipped — from an AI image editor to a full-stack e-commerce platform.
          </p>
        </div>

        {/* Cards — centered 3-column, collapses to 1 on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative flex flex-col p-6 rounded-2xl bg-[#0a1628] border border-[#ffffff0d] card-glow transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Category pill */}
              <span
                className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  background: `${project.gradientFrom}18`,
                  color: project.gradientFrom,
                  border: `1px solid ${project.gradientFrom}35`,
                }}
              >
                {project.badge ?? project.category}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}22, ${project.gradientTo}22)`,
                  border: `1px solid ${project.gradientFrom}35`,
                }}
              >
                {project.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00d2ff] transition-colors duration-300 pr-16">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#0f1f3d] text-slate-500 border border-[#ffffff0a] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-5 text-sm mt-auto border-t border-[#ffffff08] pt-4">
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-[#00d2ff] hover:opacity-75 transition-opacity font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
