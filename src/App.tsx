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

const getInstagramEmbedUrl = (instagramUrl: string) => {
  try {
    const url = new URL(instagramUrl)
    const pathParts = url.pathname.split('/').filter(Boolean)
    
    // Extract post ID from /p/{postId}/ or /reel/{postId}/
    if (pathParts[0] === 'p' || pathParts[0] === 'reel') {
      const postId = pathParts[1]
      if (postId) {
        return `https://www.instagram.com/${pathParts[0]}/${postId}/embed`
      }
    }
    
    return null
  } catch {
    return null
  }
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showAllEducation, setShowAllEducation] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeActivityIndex, setActiveActivityIndex] = useState(0)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activityFlipKey, setActivityFlipKey] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [lang, setLang] = useState<'en' | 'zh'>('en')

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
  const openImageViewer = (image: string) => setSelectedImage(image)
  const closeImageViewer = () => setSelectedImage(null)
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }
  const selectedProjectVideoEmbedUrl = selectedProject?.videoUrl
    ? getYouTubeEmbedUrl(selectedProject.videoUrl)
    : null

  const selectedProjectInstagramEmbedUrl = selectedProject?.instagramReelUrl
    ? getInstagramEmbedUrl(selectedProject.instagramReelUrl)
    : null

  const handleActivityTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleActivityTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.changedTouches[0].clientX
    const difference = touchStart - touchEnd
    const threshold = 50

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        nextActivity()
      } else {
        prevActivity()
      }
    }

    setTouchStart(null)
  }

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
                {lang === 'en' ? 'About' : '关于'}
              </a>

              <a className="nav-item nav-delay-2" href="#experience" onClick={closeMobileMenu}>
                {lang === 'en' ? 'Experience' : '经历'}
              </a>

              <a className="nav-item nav-delay-3" href="#projects" onClick={closeMobileMenu}>
                {lang === 'en' ? 'Projects' : '项目'}
              </a>

              <a className="nav-item nav-delay-4" href="#education" onClick={closeMobileMenu}>
                {lang === 'en' ? 'Education' : '教育'}
              </a>

              <a className="nav-item nav-delay-5" href="#activities" onClick={closeMobileMenu}>
                {lang === 'en' ? 'Activities' : '活动'}
              </a>

              <a className="nav-item nav-delay-6" href="#contact" onClick={closeMobileMenu}>
                {lang === 'en' ? 'Contact' : '联系'}
              </a>
            </nav>

            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={
                lang === 'en'
                  ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
                  : `切换到${theme === 'light' ? '深色' : '浅色'}模式`
              }
              title={
                lang === 'en'
                  ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
                  : `切换到${theme === 'light' ? '深色' : '浅色'}模式`
              }
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="theme-toggle-svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                </svg>
              </span>
            </button>

            <button
              className="theme-toggle"
              type="button"
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
              title={lang === 'en' ? '中文' : 'English'}
            >
              <span className="theme-toggle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="theme-toggle-svg">
                  {/* Top left box */}
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="8"
                    rx="1.5"
                    fill="var(--icon-fill)"
                  />
                  <text
                    x="7"
                    y="9"
                    textAnchor="middle"
                    fontSize="6"
                    fill="var(--icon-text)"
                    fontWeight="700"
                  >
                    文
                  </text>

                  {/* Bottom right box */}
                  <rect
                    x="13"
                    y="13"
                    width="8"
                    height="8"
                    rx="1.5"
                    fill="var(--icon-fill)"
                  />
                  <text
                    x="17"
                    y="19"
                    textAnchor="middle"
                    fontSize="6"
                    fill="var(--icon-text)"
                    fontWeight="700"
                  >
                    A
                  </text>

                  {/* Arrows */}
                  <path
                    d="M8 14C6 14 5 13 5 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M16 10C18 10 19 11 19 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </button>

            <button
              className={`menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
              type="button"
              aria-label={
                lang === 'en' ? 'Toggle navigation menu' : '切换导航菜单'
              }
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
            <p className="eyebrow">
              {lang === 'en' ? 'Aspiring Software Engineer' : '软件工程师求职者'}
            </p>

            <h1>
              {lang === 'en'
                ? 'Turning ideas into structured digital products.'
                : '将想法转化为结构化的数字产品'}
            </h1>

            <p className="hero-text">
              {lang === 'en'
                ? 'I am a graduating Information Technology student from Singapore Polytechnic specializing in Software Development, with a minor in 5G and Artificial Intelligence of Things (AIoT). I enjoy building practical software, learn quickly and enjoy turning ideas into practical solutions.'
                : '我是一名即将毕业的新加坡理工学院信息技术专业学生，主修软件开发，并辅修5G与人工智能物联网 (AIoT)。我热衷于构建实用的软件，学习能力强，并喜欢将想法转化为实际解决方案。'}
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">
                {lang === 'en' ? 'View Projects' : '查看项目'}
              </a>
              <a className="button secondary" href="#contact">
                {lang === 'en' ? 'Contact' : '联系'}
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
                  alt={lang === 'en' ? 'Profile portrait' : '个人头像'}
                  className="hero-photo"
                />
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="section two-column divider-top">
          <div className="reveal">
            <p className="section-tag">
              {lang === 'en' ? 'About' : '关于'}
            </p>

            <h2>
              {lang === 'en'
                ? 'Building practical solutions with real-world exposure.'
                : '结合真实经验构建实用解决方案'}
            </h2>
          </div>

          <div className="flow-text reveal reveal-delay-1">
            <p>
              {lang === 'en'
                ? 'I combine academic software engineering experience with real-world exposure through the Industry Now Curriculum (Project INC) pathway, where I contributed to a client-based ERP (Enterprise Resource Planning) web application for a local spa business, and my internship at Mediacorp\'s Enterprise Apps team, where I focused on automation solutions.'
                : '我通过 Industry Now Curriculum (Project INC) 项目，将学术软件工程经验与真实项目实践相结合。在该项目中，我参与为本地水疗业务开发 ERP (企业资源计划) 系统，并在 Mediacorp 企业应用团队实习期间，专注于自动化解决方案。'}
            </p>

            <p>
              {lang === 'en'
                ? 'I am continuously developing my skills and aim to build meaningful digital solutions across code-based and low-code platforms, including automation workflows and AI-enhanced solutions, with a focus on improving processes, enhancing user experiences and delivering practical impact.'
                : '我持续提升自身技能，致力于在代码开发与低代码平台上构建有意义的数字解决方案，包括自动化流程与 AI 增强应用，重点在于优化流程，提升用户体验并带来实际价值。'}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading reveal">
            <p className="section-tag">
              {lang === 'en' ? 'Skills' : '技能'}
            </p>

            <h2>
              {lang === 'en'
                ? 'Tools and technologies'
                : '工具与技术'}
            </h2>

            <p className="section-intro">
              {lang === 'en'
                ? 'Core technical stack across software engineering, databases, automation and low-code development.'
                : '涵盖软件工程，数据库，自动化以及低代码开发的核心技术栈。'}
            </p>
          </div>

          <div className="skills-group reveal reveal-delay-1">
            {skillGroups.map((group) => (
              <article
                key={group.title[lang]}
                className={`skills-group-card ${
                  group.featured ? 'skills-group-card-featured' : ''
                }`}
              >
                <div className="skills-group-top">
                  <h3>{group.title[lang]}</h3>
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
            <p className="section-tag">
              {lang === 'en' ? 'Experience' : '经历'}
            </p>
            <h2>
              {lang === 'en'
                ? 'Internships and work experience'
                : '实习与工作经验'}
            </h2>
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
                  <p className="section-tag">
                    {lang === 'en' ? 'Latest Experience' : '最新经历'}
                  </p>

                  <h3>{featuredExperience.role[lang]}</h3>

                  <p className="experience-company">
                    {featuredExperience.company} · {featuredExperience.location}
                  </p>

                  <p className="meta-line">
                    {featuredExperience.period}
                  </p>
                </div>

                <span className="badge badge-accent">
                  {featuredExperience.type[lang]}
                </span>
              </div>

              <p className="body-copy">
                {featuredExperience.summary[lang]}
              </p>

              {featuredExperience.highlight ? (
                <div className="experience-main-project">
                  <p className="section-tag">
                    {lang === 'en'
                      ? 'Main Internship Project'
                      : '主要实习项目'}
                  </p>
                  <p>{featuredExperience.highlight[lang]}</p>
                </div>
              ) : null}

              <p className="experience-list-label">
                {lang === 'en' ? 'Other Contributions' : '其他贡献'}
              </p>
              <ul className="experience-highlight-list">
                {featuredExperience.details.map((detail, i) => (
                  <li key={i}>{detail[lang]}</li>
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
            <p className="section-tag">
              {lang === 'en' ? 'Projects' : '项目'}
            </p>
            <h2>
              {lang === 'en'
                ? 'Selected work and technical builds'
                : '精选项目与技术实践'}
            </h2>
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
                alt={featuredProject.title[lang]}
                className="project-featured-image"
              />
            </div>

            <div className="project-featured-content">
              <div className="project-featured-meta">
                <span className="badge badge-accent">
                  {lang === 'en' ? 'Featured Project' : '精选项目'}
                </span>
                <p className="project-period">{featuredProject.period}</p>
              </div>

              <h3>{featuredProject.title[lang]}</h3>
              <p className="project-type">{featuredProject.type[lang]}</p> 
              <p className="body-copy">{featuredProject.description[lang]}</p>

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
                {lang === 'en' ? 'View all projects' : '查看所有项目'}
                <span className="toggle-icon">▼</span>
              </button>
            </div>
          ) : (
            <div className="projects-expanded">
              <div className="project-grid-showcase">
                {otherProjects.map((project, index) => (
                  <article
                    key={project.title.en}
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
                        alt={project.title[lang]}
                        className="project-card-image"
                      />
                    </div>

                    <div className="project-card-body">
                      <div className="project-card-top">
                        <p className="project-period">{project.period}</p>
                        <span className="project-card-badge">
                          {project.type[lang]}
                        </span>
                      </div>

                      <h3>{project.title[lang]}</h3>
                      <p className="body-copy">{project.description[lang]}</p>

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
                  {lang === 'en' ? 'Hide other projects' : '收起项目'}
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
                  <p className="section-tag">
                    {lang === 'en' ? 'Project details' : '项目详情'}
                  </p>
                  <h3>{selectedProject.title[lang]}</h3>
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
                <span className="project-card-badge">
                  {selectedProject.type[lang]}
                </span>
              </div>

              <p className="body-copy project-description">
                {selectedProject.description[lang]}
              </p>

              <div className="project-modal-section">
                <h4>
                  {lang === 'en' ? 'Detailed overview' : '详细说明'}
                </h4>
                <ul>
                  {selectedProject.details.map((detail, i) => (
                    <li key={i}>{detail[lang]}</li>
                  ))}
                </ul>
              </div>

              <div className="project-modal-section">
                <h4>{lang === 'en' ? 'Photos' : '图片'}</h4>
                <div className="project-modal-photos">
                  {selectedProject.photos.map((photo) => (
                    <img
                      key={photo}
                      src={photo}
                      alt={`${selectedProject.title[lang]} screenshot`}
                      onClick={() => openImageViewer(photo)}
                      className="project-modal-photo-clickable"
                    />
                  ))}
                </div>
              </div>

              <div className="project-modal-section">
                <h4>{lang === 'en' ? 'Video demo' : '演示视频'}</h4>

                {selectedProject.videoUrl || selectedProject.instagramReelUrl ? (
                  <div className={`project-modal-video ${selectedProject.videoUrl && selectedProject.instagramReelUrl ? 'has-multiple-videos' : ''}`}>
                    {selectedProject.videoUrl && selectedProjectVideoEmbedUrl && (
                      <div className="project-modal-video-preview">
                        <iframe
                          src={selectedProjectVideoEmbedUrl}
                          title={`${selectedProject.title[lang]} demo video`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    )}
                    {selectedProject.instagramReelUrl && selectedProjectInstagramEmbedUrl && (
                      <div className="project-modal-video-preview is-instagram-reel">
                        <iframe
                          src={selectedProjectInstagramEmbedUrl}
                          title={`${selectedProject.title[lang]} Instagram reel`}
                          loading="lazy"
                          allowFullScreen
                        />
                      </div>
                    )}
                    {(!selectedProjectVideoEmbedUrl && selectedProject.videoUrl) || (!selectedProjectInstagramEmbedUrl && selectedProject.instagramReelUrl) ? (
                      <p>
                        {lang === 'en'
                          ? 'Video link is available, but preview is not supported.'
                          : '视频链接存在，但无法预览。'}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p>
                    {lang === 'en'
                      ? 'No demo video available for this project yet.'
                      : '暂无演示视频'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="image-viewer-overlay" onClick={closeImageViewer}>
            <div className="image-viewer-container" onClick={(e) => e.stopPropagation()}>
              <button
                className="image-viewer-close"
                onClick={closeImageViewer}
                aria-label="Close image viewer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <img src={selectedImage} alt="Full size image" className="image-viewer-image" />
            </div>
          </div>
        )}

        <section id="education" className="section divider-top">
          <div className="section-heading reveal">
            <p className="section-tag">
              {lang === 'en' ? 'Education' : '教育'}
            </p>
            <h2>
              {lang === 'en'
                ? 'Academic background'
                : '教育背景'}
            </h2>
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
                    {firstEducation.qualification[lang]}
                  </p>

                  {firstEducation.details?.length ? (
                    <div className="education-detail-group">
                      <p className="education-detail-label">
                        {lang === 'en' ? 'Details' : '详情'}
                      </p>
                      {firstEducation.details.map((detail, i) => (
                        <p key={i}>{detail[lang]}</p>
                      ))}
                    </div>
                  ) : null}

                  {firstEducation.achievements?.length ? (
                    <div className="education-detail-group education-achievement-group">
                      <p className="education-detail-label">
                        {lang === 'en' ? 'Achievements' : '成就'}
                      </p>
                      {firstEducation.achievements.map((achievement, i) => (
                        <p key={i}>{achievement[lang]}</p>
                      ))}
                    </div>
                  ) : null}
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
                    <p>{item.qualification[lang]}</p>
                    <p className="meta-line">{item.period}</p>

                    {item.details?.length ? (
                      <div className="education-detail-group">
                        <p className="education-detail-label">
                          {lang === 'en' ? 'Details' : '详情'}
                        </p>
                        {item.details.map((detail, i) => (
                          <p key={i}>{detail[lang]}</p>
                        ))}
                      </div>
                    ) : null}

                    {item.achievements?.length ? (
                      <div className="education-detail-group education-achievement-group">
                        <p className="education-detail-label">
                          {lang === 'en' ? 'Achievements' : '成就'}
                        </p>
                        {item.achievements.map((achievement, i) => (
                          <p key={i}>{achievement[lang]}</p>
                        ))}
                      </div>
                    ) : null}
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
            <p className="section-tag">
              {lang === 'en' ? 'Activities' : '活动'}
            </p>
            <h2>
              {lang === 'en'
                ? 'Beyond academics and projects'
                : '课外活动与实践'}
            </h2>
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
              onTouchStart={handleActivityTouchStart}
              onTouchEnd={handleActivityTouchEnd}
            >
              <div className="activities-carousel-inner" key={activityFlipKey}>
                <div className="activities-carousel-media">
                  {activeActivity.image ? (
                    <img
                      src={activeActivity.image}
                      alt={activeActivity.title[lang]}
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
                  <h3>{activeActivity.title[lang]}</h3>
                  <p className="meta-line">{activeActivity.period}</p>
                  <p>{activeActivity.description[lang]}</p>

                  <div className="activities-carousel-dots">
                    {activities.map((activity, index) => (
                      <button
                        key={activity.title[lang]}
                        type="button"
                        className={`carousel-dot ${
                          index === activeActivityIndex ? 'is-active' : ''
                        }`}
                        onClick={() => setActiveActivityIndex(index)}
                        aria-label={`View ${activity.title[lang]}`}
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
              <p className="section-tag">
                {lang === 'en' ? 'Contact' : '联系方式'}
              </p>
              <h2>
                {lang === 'en' ? "Let's connect." : '欢迎联系我'}
              </h2>
              <p className="flow-copy">
                {lang === 'en'
                  ? 'Feel free to reach out for internships, graduate opportunities, collaborations or professional networking.'
                  : '欢迎联系我以获取实习机会，毕业生岗位，合作机会或职业交流。'}
              </p>
            </div>

            <div className="contact-card surface reveal reveal-delay-1">
              {contactItems.map((item) => (
                <div key={item.label[lang]} className="contact-item">
                  <div className="contact-item-copy">
                    <p className="contact-label">{item.label[lang]}</p>
                    <a
                      href={item.href}
                      target={item.label[lang] === 'LinkedIn' ? '_blank' : undefined}
                      rel={item.label[lang] === 'LinkedIn' ? 'noreferrer' : undefined}
                      className="contact-value"
                    >
                      {item.value}
                    </a>
                  </div>

                  <button
                    type="button"
                    className={`contact-copy-button ${
                      copiedField === item.label[lang] ? 'is-copied' : ''
                    }`}
                    onClick={() => handleCopy(item.label[lang], item.value)}
                  >
                    {copiedField === item.label[lang] ? 'Copied' : 'Copy'}
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
            {lang === 'en'
              ? `© ${new Date().getFullYear()} Wai Phyo Aung. All rights reserved.`
              : `© ${new Date().getFullYear()} Wai Phyo Aung. 版权所有`}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
