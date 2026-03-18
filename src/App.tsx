import './App.css'
import { useEffect, useMemo, useState } from 'react'

type Skill = {
  name: string
  featured?: boolean
}

type SkillGroup = {
  title: string
  featured?: boolean
  skills: Skill[]
}

type Experience = {
  company: string
  role: string
  location: string
  period: string
  type: string
  summary: string
  image: string
  imageAlt: string
  details: string[]
  tools: string[]
}

type Project = {
  title: string
  period: string
  type: string
  description: string
  stack: string[]
  image: string
  featured?: boolean
}

type EducationItem = {
  school: string
  qualification: string
  period: string
  details: string[]
}

type Activity = {
  title: string
  description: string
  image?: string
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    featured: true,
    skills: [
      { name: 'JavaScript', featured: true },
      { name: 'Python' },
      { name: 'Java', featured: true },
      { name: 'C#' },
      { name: 'SQL', featured: true },
    ],
  },
  {
    title: 'Frontend & Backend',
    featured: true,
    skills: [
      { name: 'React.js', featured: true },
      { name: 'Node.js', featured: true },
      { name: 'REST APIs' },
      { name: '.NET' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', featured: true },
      { name: 'MySQL', featured: true },
      { name: 'Microsoft SQL Server' },
    ],
  },
  {
    title: 'Tools & IDEs',
    skills: [
      { name: 'GitHub', featured: true },
      { name: 'Visual Studio Code', featured: true },
      { name: 'Microsoft Visual Studio' },
      { name: 'Eclipse' },
      { name: 'NetBeans' },
      { name: 'Postman' },
    ],
  },
  {
    title: 'Low-Code & Automation',
    featured: true,
    skills: [
      { name: 'Power Apps' },
      { name: 'Power Automate', featured: true },
      { name: 'Power BI' },
      { name: 'Jira Automation', featured: true },
      { name: 'Mendix Studio', featured: true },
    ],
  },
  {
    title: 'Others',
    skills: [
      { name: 'Software Engineering Practices', featured: true },
      { name: 'CI/CD workflows' },
      { name: 'Orange Data Mining' },
    ],
  },
]

const experiences: Experience[] = [
  {
    company: 'Mediacorp',
    role: 'Enterprise Apps Intern',
    location: 'Singapore',
    period: 'Sep 2025 – Feb 2026',
    type: 'Internship',
    summary:
      'Supported the development, testing and improvement of internal enterprise systems used across the organization.',
    image: '/images/experience/mediacorp-internship.jpeg',
    imageAlt: 'Mediacorp Enterprise Apps internship',
    details: [
      'Designed an approval workflow using Jira Automation and Microsoft Power Automate.',
      'Developed a .NET console application for backend batch jobs.',
      'Conducted system testing for internal enterprise systems.',
      'Collaborated with internal IT teams and external vendors to design workflows, prepare documentation, and support enterprise application operations.',
    ],
    tools: ['Jira Automation', 'Power Automate', '.NET', 'System Testing'],
  },
]

const projects: Project[] = [
  {
    title: 'Approval Workflow Automation',
    period: 'Nov 2025 – Jan 2026',
    featured: true,
    type: 'Internship Project',
    description:
      'Designed and implemented an approval workflow during my internship at Mediacorp using Jira Automation and Microsoft Power Automate, improving internal request handling efficiency and process standardization.',
    stack: ['Jira Automation', 'Power Automate', 'Workflow Design'],
    image: '/images/projects/workflow.png',
  },
  {
    title: 'ERP System for a Local Spa Business',
    period: 'Apr – Jul 2025',
    type: 'Real Client Project',
    description:
      'Built as part of a 14-member team. Served as Assistant Team Leader and worked on Service/Product Management and Employee Timetable modules.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    image: '/images/projects/erp.jpeg',
  },
  {
    title: 'Cleaning Service Website',
    period: 'Jan – Feb 2025',
    type: 'Academic Project',
    description:
      'Developed admin-side features for managing services, bookings and member accounts in a 3-member team project.',
    stack: ['Jakarta EE', 'PostgreSQL', 'Eclipse'],
    image: '/images/projects/cleaning.png',
  },
  {
    title: 'EcoHome Energy Monitoring App',
    period: 'Jun – Jul 2024',
    type: 'Academic Project',
    description:
      'Developed a prototype mobile application in a 3-member team to monitor home appliance energy usage. Built using the Mendix low-code platform, with Node-RED for workflow integration and SQL for data handling.',
    stack: ['Mendix', 'Node-RED', 'SQL'],
    image: '/images/projects/ecohome.png',
  },
  {
    title: 'Smart Pet Feeder IoT Project',
    period: 'Jan – Feb 2024',
    type: 'Academic Project',
    description:
      'Created a smart pet feeder using Raspberry Pi and Python with sensors and Telegram bot integration.',
    stack: ['Python', 'Raspberry Pi', 'IoT'],
    image: '/images/projects/iot.png',
  },
]

const education: EducationItem[] = [
  {
    school: 'Singapore Polytechnic',
    qualification: 'Diploma in Information Technology',
    period: 'Apr 2023 – Apr 2026',
    details: [
      'Software Development Specialization',
      'Minor in 5G and Artificial Intelligence of Things (AIoT)',
      'Industry Now Curriculum Pathway (Project INC)',
      'Director’s Honour Roll for Academic Excellence (AY2023/2024)',
      'Director’s Honour Roll for Academic Excellence (AY2024/2025)',
    ],
  },
  {
    school: 'RVi Institute',
    qualification: 'College Preparatory Programme',
    period: 'Aug 2022 – Feb 2023',
    details: ['Awarded Best in Mathematics'],
  },
  {
    school: 'MCTA Chinese High School',
    qualification: 'High School Level 1 – Gao Yi',
    period: 'Aug 2021 – Jul 2022',
    details: [
      'Awarded Best in overall score in the mid-term and final examinations',
    ],
  },
  {
    school: 'BEHS-16',
    qualification: "Myanmar High School Diploma (Equivalent to GCE ‘O’ Level)",
    period: 'Jun 2021 – Apr 2022',
    details: [
      '5 distinctions in English, Mathematics, Chemistry, Physics, and Biology',
    ],
  },
]

const activities: Activity[] = [
  {
    title: 'Pathways in Python Tech for Good Hackathon 2026',
    description:
      'Achieved second place for developing an LLM-powered desktop application using Python, PyGame, and API-based LLM integrations.',
    image: '/images/activities/hackathon.png',
  },
  {
    title: 'SIGNature Song-Signing Showcase',
    description:
      'Participated in the SIGNature Song-Signing Showcase for the Deaf community at Singapore Polytechnic.',
    image: '/images/activities/signature.jpeg',
  },
  {
    title: 'Overseas Study Trip to Kuala Lumpur',
    description:
      'Joined the School of Computing overseas study trip to Kuala Lumpur, Malaysia.',
    image: '/images/activities/kl.jpeg',
  },
  {
    title: 'Seniors Appreciation Concert',
    description:
      'Participated in the Seniors Appreciation Concert at Singapore Polytechnic.',
    image: '/images/activities/appreciation.jpeg',
  },
  {
    title: 'Basic Peer Support Skills Training',
    description:
      'Completed Basic Peer Support Skills Training under the Department of Student Services.',
    image: '/images/activities/peer-support.png',
  },
  {
    title: 'SG Clean Day',
    description:
      'Participated in SG Clean Day as part of community volunteering.',
    image: '/images/activities/sg-cleanday.png',
  },
]

const contactItems = [
  {
    label: 'Email',
    value: 'waiphyo.wpa424@gmail.com',
    href: 'mailto:waiphyo.wpa424@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/wai-phyo-aung-wpa',
    href: 'https://linkedin.com/in/wai-phyo-aung-wpa',
  },
]

function App() {
  const [showAllEducation, setShowAllEducation] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [activeActivityIndex, setActiveActivityIndex] = useState(0)
  const [copiedField, setCopiedField] = useState<string | null>(null)

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

  const nextActivity = () => {
    setActiveActivityIndex((prev) => (prev + 1) % activities.length)
  }

  const prevActivity = () => {
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
          <a className="brand" href="#home">
            Wai Phyo Aung
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a className="nav-item nav-delay-1" href="#about">
              About
            </a>
            <a className="nav-item nav-delay-2" href="#experience">
              Experience
            </a>
            <a className="nav-item nav-delay-3" href="#projects">
              Projects
            </a>
            <a className="nav-item nav-delay-4" href="#education">
              Education
            </a>
            <a className="nav-item nav-delay-5" href="#activities">
              Activities
            </a>
            <a className="nav-item nav-delay-6" href="#contact">
              Contact
            </a>
          </nav>
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
                  src="/images/profile.jpeg"
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
              automation, and low-code development.
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

          <article className="project-featured surface reveal reveal-delay-1">
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
                        <span className="project-card-badge">
                          {project.type}
                        </span>
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
                    key={item.school}
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

          <div className="activities-carousel surface reveal reveal-delay-1">
            <div className="activities-carousel-inner">
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

                <div className="activities-carousel-controls">
                  <button
                    type="button"
                    className="carousel-button"
                    onClick={prevActivity}
                    aria-label="Previous activity"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="carousel-button"
                    onClick={nextActivity}
                    aria-label="Next activity"
                  >
                    →
                  </button>
                </div>

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