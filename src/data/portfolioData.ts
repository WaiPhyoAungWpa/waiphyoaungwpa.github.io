import type {
  Activity,
  ContactItem,
  EducationItem,
  Experience,
  Project,
  SkillGroup,
} from '../types/portfolio'

export const skillGroups: SkillGroup[] = [
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
      { name: 'CI/CD Workflows' },
      { name: 'Orange Data Mining' },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: 'Mediacorp',
    role: 'Enterprise Apps Intern',
    location: 'Singapore',
    period: 'Sep 2025 – Feb 2026',
    type: 'Internship',
    summary:
      'Supported the development, testing and improvement of internal enterprise systems used across the organization.',
    image: `images/experience/mediacorp-internship.jpeg`,
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

export const projects: Project[] = [
  {
    title: 'Approval Workflow Automation',
    period: 'Nov 2025 – Jan 2026',
    featured: true,
    type: 'Internship Project',
    description:
      'Designed and implemented a bidirectional approval workflow integrating Jira Service Management with Microsoft Power Automate using REST APIs and HTTP webhooks. Automated approval routing via Outlook and Microsoft Teams, and synchronized approval outcomes back to Jira including status updates, comments and approver tracking.',
    stack: ['Jira Automation', 'Power Automate', 'REST APIs'],
    image: `images/projects/workflow.png`,
  },
  {
    title: 'ERP System for a Local Spa Business',
    period: 'Apr – Jul 2025',
    type: 'Real Client Project',
    description:
      'Developed an ERP system for a local spa business as part of a 14-member team. Served as Assistant Team Leader and contributed to Service/Product Management, Sales History and Employee Timetable modules across frontend and backend. Conducted client onboarding and refined features based on feedback, supported by use case and UML documentation.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    image: `images/projects/erp.jpeg`,
  },
  {
    title: 'Cleaning Service Website',
    period: 'Jan – Feb 2025',
    type: 'Academic Project',
    description:
      'Designed and developed a full-stack booking and management system in a 3-member team. Implemented admin features for managing services, bookings and user accounts using MVC architecture with JSP/Servlets and DAO pattern, including RESTful APIs for system integration.',
    stack: ['Jakarta EE', 'PostgreSQL', 'Eclipse'],
    image: `images/projects/cleaning.png`,
  },
  {
    title: 'EcoHome Energy Monitoring App',
    period: 'Jun – Jul 2024',
    type: 'Academic Project',
    description:
      'Applied the CDIO framework to design a low-code mobile prototype for monitoring home energy usage. Conducted persona analysis, feasibility studies and system design using diagrams and flows, and implemented the solution using Mendix (microflows, workflows and pages), Node-RED and MySQL.',
    stack: ['Mendix', 'Node-RED', 'MySQL'],
    image: `images/projects/ecohome.png`,
  },
  {
    title: 'Smart Pet Feeder IoT System',
    period: 'Jan – Feb 2024',
    type: 'Academic Project',
    description:
      'Applied the CDIO framework to design and develop a smart pet feeder system. Implemented scheduled feeding and remote control via Telegram bot using Python and Raspberry Pi, with sensors for food level monitoring and motion detection.',
    stack: ['Python', 'Raspberry Pi', 'IoT'],
    image: `images/projects/iot.png`,
  },
]

export const education: EducationItem[] = [
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

export const activities: Activity[] = [
  {
    title: 'Pathways in Python Tech for Good Hackathon 2026',
    description:
      'Achieved second place for developing an LLM-powered desktop application using Python, PyGame, and API-based LLM integrations.',
    image: `images/activities/hackathon.png`,
  },
  {
    title: 'SIGNature Song-Signing Showcase',
    description:
      'Participated in the SIGNature Song-Signing Showcase for the Deaf community at Singapore Polytechnic.',
    image: `images/activities/signature.jpeg`,
  },
  {
    title: 'Overseas Study Trip to Kuala Lumpur',
    description:
      'Joined the School of Computing overseas study trip to Kuala Lumpur, Malaysia.',
    image: `images/activities/kl.jpeg`,
  },
  {
    title: 'Seniors Appreciation Concert',
    description:
      'Participated in the Seniors Appreciation Concert at Singapore Polytechnic.',
    image: `images/activities/appreciation.jpeg`,
  },
  {
    title: 'Basic Peer Support Skills Training',
    description:
      'Completed Basic Peer Support Skills Training under the Department of Student Services.',
    image: `images/activities/peer-support.png`,
  },
  {
    title: 'SG Clean Day',
    description:
      'Participated in SG Clean Day as part of community volunteering.',
    image: `images/activities/sg-cleanday.png`,
  },
]

export const contactItems: ContactItem[] = [
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