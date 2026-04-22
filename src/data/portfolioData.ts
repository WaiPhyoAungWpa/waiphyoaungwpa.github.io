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
    title: 'Frameworks & APIs',
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
    title: 'Tools & Platforms',
    skills: [
      { name: 'GitHub', featured: true },
      { name: 'Visual Studio Code', featured: true },
      { name: 'Microsoft Visual Studio' },
      { name: 'Cursor' },
      { name: 'Eclipse' },
      { name: 'NetBeans' },
      { name: 'Postman' },
      { name: 'Orange Data Mining' },
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
    title: 'Practices & Methods',
    skills: [
      { name: 'Software Engineering Practices', featured: true },
      { name: 'CI/CD Workflows' },
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
      'Designed and implemented an approval workflow integrating Jira Service Management with Microsoft Power Automate using REST APIs and HTTP webhooks.',
    stack: ['Jira Automation', 'Microsoft Power Automate'],
    image: `images/projects/workflow.png`,
    details: [
      'Automated approval routing by extracting approvers from Jira issues and sending requests via Outlook and Microsoft Teams.',
      'Synchronized approval outcomes back to Jira, including status updates, comments and approver tracking.',
    ],
    photos: ['images/projects/workflow.png'],
    videoUrl: '',
  },
  {
    title: 'ERP System for Spa Business',
    period: 'Apr – Jul 2025',
    type: 'Client Project',
    description:
      'Developed an ERP system to support daily spa operations as part of a 14-member team.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    image: `images/projects/erp.jpeg`,
    details: [
      'Served as Assistant Team Leader, supporting team coordination and task planning.',
      'Contributed to Service/Product Management, Sales History and Employee Timetable modules across frontend and backend.',
      'Conducted client onboarding sessions and refined system features based on user feedback.',
      'Produced project documentation including use case specifications and UML diagrams.',
    ],
    photos: ['images/projects/erp.jpeg'],
    videoUrl: 'https://youtu.be/-BfXDBhM4xE',
  },
  {
    title: 'Cleaning Service Website',
    period: 'Jan – Feb 2025',
    type: 'Academic Project',
    description:
      'Designed and developed a full-stack booking and management system from scratch, including ERD, wireframes and task planning.',
    stack: ['Jakarta EE', 'PostgreSQL', 'Eclipse'],
    image: `images/projects/cleaning.png`,
    details: [
      'Implemented MVC architecture using JSP and Servlets, with DAO pattern for database interactions.',
      'Developed RESTful APIs to support system integration, including use in a reseller platform.',
      'Implemented CRUD functionalities for services, bookings and user accounts using separate servlets for request handling.',
    ],
    photos: ['images/projects/cleaning.png'],
    videoUrl: 'https://youtu.be/y9yvpn0LxhA?si=h3wphJLTnBF0jb45',
  },
  {
    title: 'EcoHome Energy Monitoring App',
    period: 'Jun – Jul 2024',
    type: 'Academic Project',
    description:
      'Applied the CDIO (Conceive–Design–Implement–Operate) framework to structure the development process.',
    stack: ['Mendix', 'Node-RED', 'MySQL'],
    image: `images/projects/ecohome.png`,
    details: [
      'Conducted persona research, target user analysis and idea evaluation to define the solution concept.',
      'Produced feasibility-impact analysis, block diagrams, data flows and flowcharts for system design.',
      'Developed a low-code prototype using Mendix with microflows, workflows and pages, MySQL for data management, and Node-RED for energy-saving logic.',
    ],
    photos: ['images/projects/ecohome.png'],
    videoUrl: 'https://youtube.com/shorts/i4BjQyweDMI?feature=share',
  },
  {
    title: 'Smart Pet Feeder IoT System',
    period: 'Jan – Feb 2024',
    type: 'Academic Project',
    description:
      'Applied the CDIO framework to structure the development process.',
    stack: ['Python', 'Raspberry Pi'],
    image: `images/projects/iot.png`,
    details: [
      'Conducted user and problem analysis and designed system architecture using block diagrams, data flows and flowcharts.',
      'Implemented the system using Raspberry Pi and Python with scheduled feeding, Telegram bot control, and sensors for food level monitoring and motion detection.',
    ],
    photos: ['images/projects/iot.png'],
    videoUrl: 'https://youtu.be/SzOXgIkv4I0',
  },
]

export const education: EducationItem[] = [
  {
    school: 'Singapore Polytechnic',
    qualification: 'Diploma in Information Technology (with Merit)',
    period: 'Apr 2023 – Apr 2026',
    details: [
      'Software Development Specialization',
      'Minor in 5G and Artificial Intelligence of Things (AIoT)',
      'Industry Now Curriculum Pathway (Project INC)',
      'Director’s Honour Roll (2024, 2025)',
      'Diploma with Merit & NCS Prize (2026)',
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
      'Achieved second place for developing an LLM-powered desktop application using Python (PyGame), prompt engineering techniques and API-based LLM integrations.',
    image: `images/activities/ntuPipHackathon.png`,
  },
  {
    title: 'Autodesk Singapore AI Hackathon 2026',
    description:
      'Participated in the Autodesk × Singapore Polytechnic School of Computing AI Hackathon 2026, where our team developed a “Universal Mock Server” to streamline backend services through a single service.',
    image: `images/activities/autodeskHackathon.jpeg`,
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