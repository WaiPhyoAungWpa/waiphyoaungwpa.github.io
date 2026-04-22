import './App.css'
import { useEffect, useMemo, useState } from 'react'
import type { Project } from './types/portfolio'
import {
  activities,
  contactItems,
  education,
  experiences,
  projects,
  skillGroups,
} from './data/portfolioData'

const THEME_STORAGE_KEY = 'portfolio-theme'

const getYouTubeEmbedUrl = (videoUrl: string) => {
  try {
    const parsedUrl = new URL(videoUrl)
    const host = parsedUrl.hostname.replace('www.', '')
    let videoId = ''

    if (host === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1)
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        videoId = parsedUrl.searchParams.get('v') ?? ''
      } else if (parsedUrl.pathname.startsWith('/shorts/')) {
        videoId = parsedUrl.pathname.split('/')[2] ?? ''
      } else if (parsedUrl.pathname.startsWith('/embed/')) {
        videoId = parsedUrl.pathname.split('/')[2] ?? ''
      }
    }

    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}?rel=0`
  } catch {
    return null
  }
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showAllEducation, setShowAllEducation] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeActivityIndex, setActiveActivityIndex] = useState(0)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activityFlipKey, setActivityFlipKey] = useState(0)

  const firstEducation = education[0]
  const featuredExperience = experiences[0]
  const activeActivity = activities[activeActivityIndex]

  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    [],
  )

  const otherProjects = useMemo(
    () => projects.filter((project) => project.title !== featuredProject.title),
    [featuredProject],
  )

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
      return
    }

    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    setTheme(prefersDarkMode ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${theme}`)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '.reveal:not(.is-visible)',
    )

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -48px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [showAllEducation, showAllProjects])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const openProjectModal = (project: Project) => setSelectedProject(project)
  const closeProjectModal = () => setSelectedProject(null)
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }
  const selectedProjectVideoEmbedUrl = selectedProject?.videoUrl
    ? getYouTubeEmbedUrl(selectedProject.videoUrl)
    : null

  const nextActivity = () => {
    setActivityFlipKey((prev) => prev + 1)
    setActiveActivityIndex((prev) => (prev + 1) % activities.length)
  }

  const prevActivity = () => {
    setActivityFlipKey((prev) => prev + 1)
    setActiveActivityIndex((prev) =>
      prev === 0 ? activities.length - 1 : prev - 1,
    )
  }

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(label)

      window.setTimeout(() => {
        setCopiedField((current) => (current === label ? null : current))
      }, 1600)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#home" onClick={closeMobileMenu}>
            Wai Phyo Aung
          </a>

          <div className="topbar-controls">
            <nav className={`nav-links ${isMobileMenuOpen ? 'is-open' : ''}`}>
              <a className="nav-item nav-delay-1" href="#about" onClick={closeMobileMenu}>
                About
              </a>
              <a className="nav-item nav-delay-2" href="#experience" onClick={closeMobileMenu}>
                Experience
              </a>
              <a className="nav-item nav-delay-3" href="#projects" onClick={closeMobileMenu}>
                Projects
              </a>
              <a className="nav-item nav-delay-4" href="#education" onClick={closeMobileMenu}>
                Education
              </a>
              <a className="nav-item nav-delay-5" href="#activities" onClick={closeMobileMenu}>
                Activities
              </a>
              <a className="nav-item nav-delay-6" href="#contact" onClick={closeMobileMenu}>
                Contact
              </a>
            </nav>

            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="theme-toggle-svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M12 4a8 8 0 0 1 0 16Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>

            <button
              className={`menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="home" className="hero section">
          <div className="hero-copy reveal">
            <p className="eyebrow">Aspiring Software Engineer</p>
            <h1>Turning ideas into structured digital products.</h1>
            <p className="hero-text">
              I am a graduating Information Technology student from Singapore
              Polytechnic specializing in Software Development, with a minor in
              5G and Artificial Intelligence of Things (AIoT). I enjoy building
              practical software, learn quickly and enjoy turning ideas into
              practical solutions.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">
                View Projects
              </a>
              <a className="button secondary" href="#contact">
                Contact
              </a>
            </div>
          </div>

          <aside className="hero-panel reveal">
            <div className="hero-photo-wrap">
              <div className="hero-photo-orbit orbit-1" />
              <div className="hero-photo-orbit orbit-2" />
              <span className="hero-photo-dot dot-1" />
              <span className="hero-photo-dot dot-2" />
              <span className="hero-photo-dot dot-3" />

              <div className="hero-photo-frame">
                <img
                  src={`images/profile.jpeg`}
                  alt="Profile portrait"
                  className="hero-photo"
                />
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="section two-column divider-top">
          <div className="reveal">
            <p className="section-tag">About</p>
            <h2>Building practical solutions with real-world exposure.</h2>
          </div>

          <div className="flow-text reveal reveal-delay-1">
            <p>
              I combine academic software engineering experience with real-world
              exposure through the Industry Now Curriculum (Project INC)
              pathway, where I contributed to a client-based ERP web application
              for a local spa business, and my internship at Mediacorp’s
              Enterprise Apps team, where I focused on automation solutions.
            </p>
            <p>
              I am continuously developing my skills and aim to build meaningful
              digital solutions across code-based and low-code platforms,
              including automation workflows and AI-enhanced solutions, with a
              focus on improving processes, enhancing user experiences and
              delivering practical impact.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading reveal">
            <p className="section-tag">Skills</p>
            <h2>Tools and technologies</h2>
            <p className="section-intro">
              Core technical stack across software engineering, databases,
              automation and low-code development.
            </p>
          </div>

          <div className="skills-group reveal reveal-delay-1">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className={`skills-group-card ${
                  group.featured ? 'skills-group-card-featured' : ''
                }`}
              >
                <div className="skills-group-top">
                  <h3>{group.title}</h3>
                </div>

                <div className="skills-grid">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`skill-pill ${
                        skill.featured ? 'skill-pill-featured' : ''
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section divider-top">
          <div className="section-heading reveal">
            <p className="section-tag">Experience</p>
            <h2>Internships and work experience</h2>
          </div>

          <article className="experience-card surface reveal reveal-delay-1">
            <div className="experience-media">
              <img
                src={featuredExperience.image}
                alt={featuredExperience.imageAlt}
                className="experience-image"
              />
            </div>

            <div className="experience-content">
              <div className="experience-top">
                <div>
                  <p className="section-tag">Latest Experience</p>
                  <h3>{featuredExperience.role}</h3>
                  <p className="experience-company">
                    {featuredExperience.company} · {featuredExperience.location}
                  </p>
                  <p className="meta-line">{featuredExperience.period}</p>
                </div>

                <span className="badge badge-accent">
                  {featuredExperience.type}
                </span>
              </div>

              <p className="body-copy">{featuredExperience.summary}</p>

              <ul className="experience-highlight-list">
                {featuredExperience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <div className="tag-row">
                {featuredExperience.tools.map((tool) => (
                  <span key={tool} className="project-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section id="projects" className="section divider-top">
          <div className="section-heading reveal">
            <p className="section-tag">Projects</p>
            <h2>Selected work and technical builds</h2>
          </div>

          <article
            className="project-featured surface reveal reveal-delay-1"
            onClick={() => openProjectModal(featuredProject)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openProjectModal(featuredProject)
              }
            }}
          >
            <div className="project-featured-media">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="project-featured-image"
              />
            </div>

            <div className="project-featured-content">
              <div className="project-featured-meta">
                <span className="badge badge-accent">Featured Project</span>
                <p className="project-period">{featuredProject.period}</p>
              </div>

              <h3>{featuredProject.title}</h3>
              <p className="project-type">{featuredProject.type}</p>
              <p className="body-copy">{featuredProject.description}</p>

              <div className="tag-row">
                {featuredProject.stack.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {!showAllProjects ? (
            <div className="section-toggle reveal reveal-delay-2">
              <button
                className="toggle-button"
                onClick={() => setShowAllProjects(true)}
                type="button"
              >
                View all projects
                <span className="toggle-icon">▼</span>
              </button>
            </div>
          ) : (
            <div className="projects-expanded">
              <div className="project-grid-showcase">
                {otherProjects.map((project, index) => (
                  <article
                    key={project.title}
                    className={`project-showcase-card surface reveal ${
                      index % 2 === 0 ? 'reveal-delay-1' : 'reveal-delay-2'
                    }`}
                    onClick={() => openProjectModal(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openProjectModal(project)
                      }
                    }}
                  >
                    <div className="project-card-media">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-card-image"
                      />
                    </div>

                    <div className="project-card-body">
                      <div className="project-card-top">
                        <p className="project-period">{project.period}</p>
                        <span className="project-card-badge">{project.type}</span>
                      </div>

                      <h3>{project.title}</h3>
                      <p className="body-copy">{project.description}</p>

                      <div className="tag-row">
                        {project.stack.map((tag) => (
                          <span key={tag} className="project-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="section-toggle reveal reveal-delay-2">
                <button
                  className="toggle-button"
                  onClick={() => setShowAllProjects(false)}
                  type="button"
                >
                  Hide other projects
                  <span className="toggle-icon">▲</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {selectedProject && (
          <div className="project-modal-overlay" onClick={closeProjectModal}>
            <div
              className="project-modal surface"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="project-modal-header">
                <div>
                  <p className="section-tag">Project details</p>
                  <h3>{selectedProject.title}</h3>
                </div>
                <button
                  className="button secondary project-modal-close"
                  type="button"
                  aria-label="Close project details"
                  onClick={closeProjectModal}
                >
                  ×
                </button>
              </div>

              <div className="project-modal-meta">
                <span className="project-period">{selectedProject.period}</span>
                <span className="project-card-badge">{selectedProject.type}</span>
              </div>

              <p className="body-copy project-description">
                {selectedProject.description}
              </p>

              <div className="project-modal-section">
                <h4>Detailed overview</h4>
                <ul>
                  {selectedProject.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="project-modal-section">
                <h4>Photos</h4>
                <div className="project-modal-photos">
                  {selectedProject.photos.map((photo) => (
                    <img
                      key={photo}
                      src={photo}
                      alt={`${selectedProject.title} screenshot`}
                    />
                  ))}
                </div>
              </div>

              <div className="project-modal-section">
                <h4>Video demo</h4>
                {selectedProject.videoUrl ? (
                  <div className="project-modal-video">
                    {selectedProjectVideoEmbedUrl ? (
                      <div className="project-modal-video-preview">
                        <iframe
                          src={selectedProjectVideoEmbedUrl}
                          title={`${selectedProject.title} demo video`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <p>Video link is available, but preview is not supported.</p>
                    )}
                  </div>
                ) : (
                  <p>No demo video available for this project yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <section id="education" className="section divider-top">
          <div className="section-heading reveal">
            <p className="section-tag">Education</p>
            <h2>Academic background</h2>
          </div>

          {!showAllEducation ? (
            <div className="education-preview-wrap">
              <div className="education-preview-grid">
                <div className="reveal reveal-delay-1">
                  <p className="section-tag">Latest Education</p>
                  <h3>{firstEducation.school}</h3>
                  <p className="meta-line">{firstEducation.period}</p>
                </div>

                <div className="education-preview-card surface reveal reveal-delay-2">
                  <p className="education-preview-course">
                    {firstEducation.qualification}
                  </p>

                  {firstEducation.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>

              <div className="section-toggle reveal reveal-delay-2">
                <button
                  className="toggle-button"
                  onClick={() => setShowAllEducation(true)}
                  type="button"
                >
                  View full education timeline
                  <span className="toggle-icon">▼</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="education-expanded">
              <div className="education-timeline">
                {education.map((item, index) => (
                  <article
                    key={`${item.school}-${item.period}`}
                    className={`education-item reveal ${
                      index % 2 === 0 ? 'reveal-delay-1' : 'reveal-delay-2'
                    } ${
                      item.school === firstEducation.school
                        ? 'education-item-featured'
                        : ''
                    }`}
                  >
                    <h3>{item.school}</h3>
                    <p>{item.qualification}</p>
                    <p className="meta-line">{item.period}</p>

                    {item.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </article>
                ))}
              </div>

              <div className="section-toggle reveal reveal-delay-2">
                <button
                  className="toggle-button"
                  onClick={() => setShowAllEducation(false)}
                  type="button"
                >
                  Hide full education timeline
                  <span className="toggle-icon">▲</span>
                </button>
              </div>
            </div>
          )}
        </section>

        <section id="activities" className="section divider-top">
          <div className="section-heading reveal">
            <p className="section-tag">Activities</p>
            <h2>Beyond academics and projects</h2>
          </div>

          <div className="activities-carousel-wrapper reveal reveal-delay-1">
            <button
              type="button"
              className="carousel-button carousel-button-prev"
              onClick={prevActivity}
              aria-label="Previous activity"
            >
              ←
            </button>

            <div
              className="activities-carousel surface"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  nextActivity()
                }
              }}
            >
              <div className="activities-carousel-inner" key={activityFlipKey}>
                <div className="activities-carousel-media">
                  {activeActivity.image ? (
                    <img
                      src={activeActivity.image}
                      alt={activeActivity.title}
                      className="activities-carousel-image"
                    />
                  ) : (
                    <div className="activities-carousel-placeholder">
                      <span>Activity</span>
                    </div>
                  )}
                </div>

                <div className="activities-carousel-content">
                  <p className="project-period">
                    {activeActivityIndex + 1} / {activities.length}
                  </p>
                  <h3>{activeActivity.title}</h3>
                  <p>{activeActivity.description}</p>

                  <div className="activities-carousel-dots">
                    {activities.map((activity, index) => (
                      <button
                        key={activity.title}
                        type="button"
                        className={`carousel-dot ${
                          index === activeActivityIndex ? 'is-active' : ''
                        }`}
                        onClick={() => setActiveActivityIndex(index)}
                        aria-label={`View ${activity.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="carousel-button carousel-button-next"
              onClick={nextActivity}
              aria-label="Next activity"
            >
              →
            </button>
          </div>
        </section>

        <section id="contact" className="section divider-top">
          <div className="contact-shell">
            <div className="contact-copy reveal">
              <p className="section-tag">Contact</p>
              <h2>Let’s connect.</h2>
              <p className="flow-copy">
                Feel free to reach out for internship, graduate opportunities,
                collaborations, or professional networking.
              </p>
            </div>

            <div className="contact-card surface reveal reveal-delay-1">
              {contactItems.map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-item-copy">
                    <p className="contact-label">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.label === 'LinkedIn' ? '_blank' : undefined}
                      rel={item.label === 'LinkedIn' ? 'noreferrer' : undefined}
                      className="contact-value"
                    >
                      {item.value}
                    </a>
                  </div>

                  <button
                    type="button"
                    className={`contact-copy-button ${
                      copiedField === item.label ? 'is-copied' : ''
                    }`}
                    onClick={() => handleCopy(item.label, item.value)}
                  >
                    {copiedField === item.label ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App