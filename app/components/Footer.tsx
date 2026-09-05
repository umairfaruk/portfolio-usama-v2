const navLinks = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact',  label: 'Contact' },
]

const socials = [
  { label: 'Email',    href: 'mailto:usamaasif7877@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="bg-[#040913] border-t border-[#ffffff08]">
      <div
        className="h-px w-full opacity-40"
        style={{ background: 'linear-gradient(90deg, transparent, #00d2ff, #a855f7, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#hero" className="text-2xl font-extrabold gradient-text tracking-tight inline-block mb-3">
              Usama Asif 
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full-Stack Web Developer & AI Integration Specialist. BS Computer Science, University of Gujrat.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-500 hover:text-[#00d2ff] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Connect</h4>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-slate-500 hover:text-[#00d2ff] transition-colors text-sm">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#ffffff08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()}{' '}
            <span className="gradient-text font-semibold">Usama Asif</span>. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  )
}
