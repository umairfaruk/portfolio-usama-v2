'use client'

import { useEffect, useRef, useState } from 'react'

const contactInfo = [
  { icon: '📧', label: 'Email',    value: 'usamaasif7877@gmail.com',  href: 'mailto:usamaasif7877@gmail.com' },
  { icon: '📱', label: 'Phone',    value: '+92 312 7266295',           href: 'tel:+923127266295' },
  { icon: '📍', label: 'Location', value: 'Pakistan',                  href: null },
  { icon: '⏰', label: 'Response', value: 'Within 24 hours',           href: null },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-[#0f1f3d] border border-[#ffffff0d] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00d2ff50] transition-colors duration-200'

  return (
    <section id="contact" ref={ref} className="py-28 px-6 relative bg-[#040913]">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#00d2ff] font-mono text-xs uppercase tracking-[0.3em] mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm">
            Have a project in mind? Send me a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left — contact info */}
          <div
            className={`md:col-span-2 space-y-4 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0a1628] border border-[#00d2ff12] card-glow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00d2ff12] flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-slate-300 hover:text-[#00d2ff] transition-colors text-sm font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-300 text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-[#00d2ff0d] border border-[#00d2ff25]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
                <span className="text-[#00d2ff] font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Open to freelance projects and full-time opportunities.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`md:col-span-3 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-[#0a1628] border border-[#00d2ff25] min-h-[420px]">
                <div className="text-6xl mb-5">✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-6 max-w-xs">
                  Thanks for reaching out. I&apos;ll reply from{' '}
                  <span className="text-[#00d2ff]">usamaasif7877@gmail.com</span> within 24 hours.
                </p>
                <button className="text-[#00d2ff] hover:underline text-sm" onClick={() => setSent(false)}>
                  Send another message →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-2xl bg-[#0a1628] border border-[#00d2ff12]"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">Your Name</label>
                    <input
                      type="text" required placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email" required placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">Subject</label>
                  <input
                    type="text" required placeholder="Project Inquiry / Collaboration"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    required rows={6}
                    placeholder="Tell me about your project, timeline, and budget..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center -mb-1">{error}</p>
                )}

                <button
                  type="submit" disabled={sending}
                  className="w-full py-4 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 glow-teal text-sm"
                  style={{ background: 'linear-gradient(135deg, #00d2ff, #a855f7)' }}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
