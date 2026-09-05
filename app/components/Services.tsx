'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: '🌐',
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications built with React.js, Next.js, Node.js and MongoDB. From responsive UIs to scalable REST APIs.',
    features: [
      'React.js & Next.js front-ends',
      'Node.js / Express.js back-ends',
      'MongoDB database design',
      'Performance & SEO optimisation',
    ],
    accentColor: '#00d2ff',
  },
  {
    icon: '🤖',
    title: 'AI Integration & Chatbots',
    description:
      'Embedding AI models — including image generation and chatbot systems — directly into production web applications.',
    features: [
      'AI chatbot development',
      'Image generation integration',
      'OpenCV & neural network pipelines',
      'Python ML model deployment',
    ],
    accentColor: '#a855f7',
  },
  {
    icon: '🔐',
    title: 'Auth, APIs & Security',
    description:
      'Secure authentication flows and reliable API layers. JWT, OAuth, and RESTful API design following industry best practices.',
    features: [
      'JWT & OAuth implementation',
      'RESTful API design',
      'Web Sockets / real-time features',
      'Security best practices',
    ],
    accentColor: '#10b981',
  },
  {
    icon: '🚀',
    title: 'Deployment & Maintenance',
    description:
      'Managing hosting, domains, CI/CD, and ongoing maintenance so your website stays fast, secure, and always online.',
    features: [
      'Domain & hosting configuration',
      'Git / GitHub version control',
      'Performance monitoring',
      'Ongoing client support',
    ],
    accentColor: '#f59e0b',
  },
]

export default function Services() {
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
    <section id="services" ref={ref} className="py-28 px-6 relative bg-[#050b18]">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #00d2ff, #a855f7, transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#00d2ff] font-mono text-xs uppercase tracking-[0.3em] mb-3">What I Offer</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm">
            From pixel-perfect front-ends to AI-powered back-ends — I cover the full stack.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group p-8 rounded-2xl bg-[#0a1628] border border-[#ffffff0d] card-glow transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: `${service.accentColor}15`,
                    border: `1px solid ${service.accentColor}35`,
                  }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>

              <div
                className="h-px mb-5 opacity-20"
                style={{ background: `linear-gradient(90deg, ${service.accentColor}, transparent)` }}
              />

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-400 text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke={service.accentColor}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-slate-400 mb-5 text-sm">Have a project idea? Let&apos;s bring it to life.</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-opacity glow-teal"
            style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
          >
            Start a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
