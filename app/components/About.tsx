'use client'

import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'JavaScript / TypeScript',   level: 88 },
  { name: 'React.js / Next.js',        level: 85 },
  { name: 'Node.js / Express.js',      level: 80 },
  { name: 'Python & AI / ML',          level: 75 },
  { name: 'MongoDB / Databases',       level: 78 },
  { name: 'Tailwind CSS / UI Design',  level: 90 },
  { name: 'Git / Version Control',     level: 82 },
  { name: 'REST APIs / Auth (JWT)',     level: 78 },
]

const techStack = [
  'JavaScript (ES6+)', 'TypeScript', 'Python', 'C++',
  'React.js', 'Next.js', 'Node.js', 'Express.js',
  'MongoDB', 'Tailwind CSS', 'Web Sockets', 'JWT / OAuth',
  'NumPy', 'Pandas', 'OpenCV', 'Neural Networks',
  'Git / GitHub', 'REST APIs',
]

const stats = [
  { value: '2+',   label: 'Years Experience' },
  { value: '3',    label: 'Real Projects Built' },
  { value: '3.15', label: 'CGPA / 4.00' },
  { value: 'B2',   label: 'English Level' },
]

const experience = [

  {
    role:     'Web Developer',
    company:  'Technic Mentors',
    period:   'Nov 2024 – Present',
    location: 'Gujranwala, Pakistan',
    points: [
      'Developed responsive web apps using ReactJS and NextJS',
      'Designed and implemented RESTful APIs for front-end/back-end integration',
      'Integrated AI models for image generation and chatbot systems',
      'Improved performance, scalability, and code quality',
    ],
    color: '#a855f7',
  },
  {
    role:     'MERN Stack Intern',
    company:  'Business Incubation Centre (BIC)',
    period:   'Mar 2024 – Jul 2024',
    location: 'Gujrat, Pakistan',
    points: [
      'Debugged, tested, and deployed new features alongside senior developers',
      'Managed code with Git/GitHub and contributed to agile stand-ups',
      'Optimized application performance and improved user experience',
    ],
    color: '#10b981',
  },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-28 px-6 relative bg-[#050b18]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#00d2ff] font-mono text-xs uppercase tracking-[0.3em] mb-3">Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-[#0a1628] border border-[#00d2ff18] card-glow">
              <div className="text-3xl font-extrabold gradient-text mb-1">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bio + Skills */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">

          {/* Bio */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              CS Graduate Turned <span className="gradient-text">Full-Stack Dev</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              I&apos;m Usama Asif, a BS Computer Science graduate from the{' '}
              <span className="text-slate-300 font-medium">University of Gujrat</span> (GPA 3.15/4.00),
              born in 2001 and based in Pakistan. I started my professional journey as a MERN stack
              intern and grew into a full-stack developer at Technic Mentors, where I shipped AI-integrated
              web applications for real clients.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Today I freelance independently — building, deploying, and maintaining production
              websites. I love competitive programming and stay up to date with emerging tech.
              My final year project, <span className="text-[#00d2ff] font-medium">Editro</span>,
              is an AI-powered image editing platform that showcases my passion for combining
              web development with machine learning.
            </p>

            {/* Education highlight */}
            <div className="p-4 rounded-xl bg-[#0a1628] border border-[#a855f730] mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Education</p>
              <p className="text-white font-semibold">BS Computer Science</p>
              <p className="text-slate-400 text-sm">University of Gujrat &bull; 2020–2024 &bull; GPA 3.15 / 4.00</p>
            </div>

            {/* Cert highlight */}
            <div className="p-4 rounded-xl bg-[#0a1628] border border-[#00d2ff20]">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Certification</p>
              <p className="text-white font-semibold text-sm">Node with React: Fullstack Web App</p>
              <p className="text-slate-400 text-xs">Udemy &bull; Oct 2025</p>
            </div>
          </div>

          {/* Skills */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-[#00d2ff] font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#0f1f3d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: visible ? `${skill.level}%` : '0%',
                        background: 'linear-gradient(90deg, #00d2ff, #a855f7)',
                        transitionDelay: '400ms',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '350ms' }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Work <span className="gradient-text">Experience</span>
          </h3>
          <div className="space-y-5">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-[#ffffff10] group">
                {/* Dot */}
                <div
                  className="absolute -left-[9px] top-5 w-4 h-4 rounded-full border-2 border-[#050b18]"
                  style={{ background: exp.color }}
                />
                <div className="p-5 rounded-2xl bg-[#0a1628] border border-[#ffffff0d] card-glow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-white font-bold">{exp.role}</h4>
                      <p className="text-sm font-medium" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">{exp.period}</p>
                      <p className="text-slate-600 text-xs">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-center text-lg font-semibold text-slate-300 mb-6">Full Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-[#0a1628] border border-[#00d2ff18] text-slate-300 text-sm font-mono hover:border-[#00d2ff60] hover:text-[#00d2ff] transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
