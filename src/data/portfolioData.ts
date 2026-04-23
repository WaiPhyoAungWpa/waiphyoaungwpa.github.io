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
    title: {
      en: 'Languages',
      zh: '编程语言',
    },
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
    title: {
      en: 'Frameworks & APIs',
      zh: '框架与接口',
    },
    featured: true,
    skills: [
      { name: 'React.js', featured: true },
      { name: 'Node.js', featured: true },
      { name: 'REST APIs' },
      { name: '.NET' },
    ],
  },
  {
    title: {
      en: 'Databases',
      zh: '数据库',
    },
    skills: [
      { name: 'PostgreSQL', featured: true },
      { name: 'MySQL', featured: true },
      { name: 'Microsoft SQL Server' },
    ],
  },
  {
    title: {
      en: 'Tools & Platforms',
      zh: '工具与平台',
    },
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
    title: {
      en: 'Low-Code & Automation',
      zh: '低代码与自动化',
    },
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
    title: {
      en: 'Practices & Methods',
      zh: '方法与实践',
    },
    skills: [
      { name: 'Software Engineering Practices', featured: true },
      { name: 'CI/CD Workflows' },
    ],
  },
]

export const experiences: Experience[] = [
  {
    company: 'Mediacorp',
    role: {
      en: 'Enterprise Apps Intern',
      zh: '企业应用实习生',
    },
    location: 'Singapore',
    period: 'Sep 2025 - Feb 2026',
    type: {
      en: 'Internship',
      zh: '实习',
    },
    summary: {
      en: 'Supported the development, testing and improvement of internal enterprise systems used across the organization.',
      zh: '支持企业内部系统的开发，测试与优化。',
    },
    image: `images/experience/mediacorp-internship.jpeg`,
    imageAlt: 'Mediacorp Enterprise Apps internship',

    details: [
      {
        en: 'Designed an approval workflow using Jira Automation and Microsoft Power Automate.',
        zh: '使用 Jira Automation 和 Microsoft Power Automate 设计审批流程。',
      },
      {
        en: 'Developed a .NET console application for backend batch jobs.',
        zh: '开发用于后端批处理任务的 .NET 控制台应用程序。',
      },
      {
        en: 'Conducted system testing for internal enterprise systems.',
        zh: '为企业内部系统进行系统测试。',
      },
      {
        en: 'Collaborated with internal IT teams and external vendors to design workflows, prepare documentation and support enterprise application operations.',
        zh: '与内部 IT 团队和外部供应商合作，设计工作流程，编写文档并支持企业应用系统运行。',
      },
    ],

    tools: ['Jira Automation', 'Power Automate', '.NET', 'System Testing'],
  },
]

export const projects: Project[] = [
  {
    title: {
      en: 'Approval Workflow Automation',
      zh: '审批流程自动化',
    },
    period: 'Nov 2025 - Jan 2026',
    featured: true,
    type: {
      en: 'Internship Project',
      zh: '实习项目'
    },
    description: {
      en: 'Designed and implemented an approval workflow integrating Jira Service Management with Microsoft Power Automate using REST APIs and HTTP webhooks.',
      zh: '设计并实现审批流程，将 Jira Service Management 与 Microsoft Power Automate 通过 REST API 和 HTTP Webhook 集成。',
    },
    stack: ['Jira Automation', 'Microsoft Power Automate'],
    image: `images/projects/workflow.png`,
    details: [
      {
        en: 'Automated approval routing by extracting approvers from Jira issues and sending requests via Outlook and Microsoft Teams.',
        zh: '通过从 Jira 问题中提取审批人，并通过 Outlook 和 Microsoft Teams 发送请求，实现审批流程自动化。',
      },
      {
        en: 'Synchronized approval outcomes back to Jira, including status updates, comments and approver tracking.',
        zh: '将审批结果同步回 Jira，包括状态更新，评论和审批人跟踪。',
      },
    ],
    photos: ['images/projects/workflow.png'],
    videoUrl: '',
  },

  {
    title: {
      en: 'ERP System for Spa Business',
      zh: '水疗业务 ERP 系统',
    },
    period: 'Apr - Jul 2025',
    type: {
      en: 'Client Project',
      zh: '客户项目'
    },
    description: {
      en: 'Developed an ERP (Enterprise Resource Planning) system to support daily spa operations as part of a 14-member team.',
      zh: '作为 14 人团队的一员，开发用于支持水疗业务日常运营的 ERP (企业资源计划) 系统。',
    },
    stack: ['React', 'Node.js', 'PostgreSQL'],
    image: `images/projects/erp.jpeg`,
    details: [
      {
        en: 'Served as Assistant Team Leader, supporting team coordination and task planning.',
        zh: '担任副组长，协助团队协调与任务规划。',
      },
      {
        en: 'Contributed to Service/Product Management, Sales History and Employee Timetable modules across frontend and backend.',
        zh: '参与服务/产品管理，销售记录和员工排班模块的前后端开发。',
      },
      {
        en: 'Conducted client onboarding sessions and refined system features based on user feedback.',
        zh: '开展客户培训并根据用户反馈优化系统功能。',
      },
      {
        en: 'Produced project documentation including use case specifications and UML (Unified Modeling Language) diagrams.',
        zh: '编写项目文档，包括用例说明和 UML (统一建模语言) 图。',
      },
    ],
    photos: ['images/projects/erp.jpeg'],
    videoUrl: 'https://youtu.be/-BfXDBhM4xE',
  },

  {
    title: {
      en: 'Cleaning Service Website',
      zh: '清洁服务网站',
    },
    period: 'Jan - Feb 2025',
    type: {
      en: 'Academic Project',
      zh: '学术项目'
    },
    description: {
      en: 'Designed and developed a full-stack booking and management system from scratch, including ERD, wireframes and task planning.',
      zh: '从零开始设计并开发全栈预订与管理系统，包括实体关系图，线框图和任务规划。',
    },
    stack: ['Jakarta EE', 'PostgreSQL', 'Eclipse'],
    image: `images/projects/cleaning.png`,
    details: [
      {
        en: 'Implemented MVC architecture using JSP and Servlets, with DAO (Data Access Object) pattern for database interactions.',
        zh: '使用 JSP 和 Servlet 实现 MVC 架构，采用 DAO (数据访问对象) 模式进行数据库交互。',
      },
      {
        en: 'Developed RESTful APIs to support system integration, including use in a reseller platform.',
        zh: '开发 RESTful API 以支持系统集成，包括在经销商平台中的应用。',
      },
      {
        en: 'Implemented CRUD (Create-Read-Update-Delete) functionalities for services, bookings and user accounts using separate servlets for request handling.',
        zh: '实现服务，预订和用户账户的 CRUD (增删查改) 功能，使用单独的 servlet 处理请求。',
      },
    ],
    photos: ['images/projects/cleaning.png'],
    videoUrl: 'https://youtu.be/y9yvpn0LxhA',
  },

  {
    title: {
      en: 'EcoHome Energy Monitoring App',
      zh: 'EcoHome 能源监控应用',
    },
    period: 'Jun - Jul 2024',
    type: {
      en: 'Academic Project',
      zh: '学术项目'
    },
    description: {
      en: 'Applied the CDIO (Conceive-Design-Implement-Operate) framework to structure the development process.',
      zh: '使用 CDIO (构思-设计-实现-运作) 框架对系统开发过程进行结构化管理。',
    },
    stack: ['Mendix', 'Node-RED', 'MySQL'],
    image: `images/projects/ecohome.png`,
    details: [
      {
        en: 'Conducted persona research, target user analysis and idea evaluation to define the solution concept.',
        zh: '开展用户画像研究，目标用户分析及方案评估，以明确解决方案概念。',
      },
      {
        en: 'Produced feasibility-impact analysis, block diagrams, data flows and flowcharts for system design.',
        zh: '进行可行性与影响分析，并绘制系统框图，数据流图及流程图以完成系统设计。',
      },
      {
        en: 'Developed a low-code prototype using Mendix with microflows, workflows and pages, MySQL for data management and Node-RED for energy-saving logic.',
        zh: '使用 Mendix 开发低代码原型（包括微流程，工作流和页面），结合 MySQL 进行数据管理，并利用 Node-RED 实现节能逻辑。',
      }
    ],
    photos: ['images/projects/ecohome.png'],
    videoUrl: 'https://youtube.com/shorts/i4BjQyweDMI',
  },

  {
    title: {
      en: 'Smart Pet Feeder IoT System',
      zh: '智能宠物喂食器物联网系统',
    },
    period: 'Jan - Feb 2024',
    type: {
      en: 'Academic Project',
      zh: '学术项目'
    },
    description: {
      en: 'Applied the CDIO (Conceive-Design-Implement-Operate) framework to structure the development process.',
      zh: '使用 CDIO (构思-设计-实现-运作) 框架对系统开发过程进行结构化管理。',
    },
    stack: ['Python', 'Raspberry Pi'],
    image: `images/projects/iot.png`,
    details: [
      {
        en: 'Conducted user and problem analysis and designed system architecture using block diagrams, data flows and flowcharts.',
        zh: '开展用户和问题分析，并使用框图，数据流图和流程图设计系统架构。',
      },
      {
        en: 'Implemented the system using Raspberry Pi and Python with scheduled feeding, Telegram bot control, and sensors for food level monitoring and motion detection.',
        zh: '使用 Raspberry Pi 和 Python 实现系统，包括定时喂食，Telegram 机器人控制以及用于食物水平监测和运动检测的传感器。',
      },
    ],
    photos: ['images/projects/iot.png'],
    videoUrl: 'https://youtu.be/SzOXgIkv4I0',
  },
]

export const education: EducationItem[] = [
  {
    school: 'Singapore Polytechnic',
    qualification: {
      en: 'Diploma in Information Technology (with Merit)',
      zh: '信息技术文凭（优异成绩）',
    },
    period: 'Apr 2023 - Apr 2026',
    details: [
      {
        en: 'Software Development Specialization',
        zh: '软件开发方向',
      },
      {
        en: 'Minor in 5G and Artificial Intelligence of Things (AIoT)',
        zh: '辅修5G与人工智能物联网 (AIoT)',
      },
      {
        en: 'Industry Now Curriculum Pathway (Project INC)',
        zh: 'Industry Now 课程路径 (Project INC)',
      },
      {
        en: 'Director\'s Honour Roll (2024, 2025)',
        zh: '院长荣誉榜 (2024， 2025)',
      },
      {
        en: 'Diploma with Merit & NCS Prize (2026)',
        zh: '优异文凭与 NCS 奖 (2026)',
      },
    ],
  },
  {
    school: 'RVi Institute',
    qualification: {
      en: 'College Preparatory Programme',
      zh: '大学预科课程',
    },
    period: 'Aug 2022 - Feb 2023',
    details: [
      {
        en: 'Awarded Best in Mathematics',
        zh: '数学成绩最佳奖',
      },
    ],
  },
  {
    school: 'MCTA Chinese High School',
    qualification: {
      en: 'High School Level 1 - Gao Yi',
      zh: '高中一年级（高一）',
    },
    period: 'Aug 2021 - Jul 2022',
    details: [
      {
        en: 'Awarded Best in overall score in the mid-term and final examinations',
        zh: '期中与期末考试总成绩第一名',
      },
    ],
  },
  {
    school: 'BEHS-16',
    qualification: {
      en: "Myanmar High School Diploma (Equivalent to GCE \'O\' Level)",
      zh: '缅甸高中毕业证书（相当于 GCE O 水准）',
    },
    period: 'Jun 2021 - Apr 2022',
    details: [
      {
        en: '5 distinctions in English, Mathematics, Chemistry, Physics and Biology',
        zh: '英语，数学，化学，物理和生物五科优异成绩',
      },
    ],
  },
]

export const activities: Activity[] = [
  {
    title: {
      en: 'Pathways in Python Tech for Good Hackathon 2026',
      zh: 'Python Tech for Good 黑客松 2026',
    },
    description: {
      en: 'Achieved second place for developing an LLM-powered desktop application as a team using Python (PyGame), prompt engineering techniques and API-based LLM integrations.',
      zh: '开发基于 LLM 的桌面应用（使用 Python 与 PyGame)，结合提示工程与 API 集成，获得小组项目比赛第二名。',
    },
    period: 'Feb 2026',
    image: `images/activities/ntuPipHackathon.png`,
  },
  {
    title: {
      en: 'Autodesk Singapore AI Hackathon 2026',
      zh: 'Autodesk 新加坡 AI 黑客松 2026',
    },
    description: {
      en: 'Participated in the Autodesk x Singapore Polytechnic School of Computing AI Hackathon 2026, where our team developed a “Universal Mock Server” to streamline backend services through a single service.',
      zh: '参与 Autodesk 与新加坡理工学院计算机学院联合举办的 AI 黑客松，团队开发“通用模拟服务器”，通过单一服务简化后端流程。',
    },
    period: 'Apr 2026',
    image: `images/activities/autodeskHackathon.jpeg`,
  },
  {
    title: {
      en: 'SIGNature Song-Signing Showcase',
      zh: 'SIGNature 手语歌曲展示活动',
    },
    description: {
      en: 'Participated in the SIGNature Song-Signing Showcase for the Deaf community at Singapore Polytechnic.',
      zh: '参与新加坡理工学院为听障群体举办的手语歌曲展示活动。',
    },
    period: 'Oct 2024',
    image: `images/activities/signature.jpeg`,
  },
  {
    title: {
      en: 'Overseas Study Trip to Kuala Lumpur',
      zh: '吉隆坡海外学习之旅',
    },
    description: {
      en: 'Joined the School of Computing overseas study trip to Kuala Lumpur, Malaysia.',
      zh: '参加计算机学院组织的马来西亚吉隆坡海外学习之旅。',
    },
    period: 'Dec 2024',
    image: `images/activities/kl.jpeg`,
  },
  {
    title: {
      en: 'Seniors Appreciation Concert',
      zh: '长者感恩音乐会',
    },
    description: {
      en: 'Participated in the Seniors Appreciation Concert at Singapore Polytechnic.',
      zh: '参与新加坡理工学院长者感恩音乐会活动。',
    },
    period: 'Oct 2024',
    image: `images/activities/appreciation.jpeg`,
  },
  {
    title: {
      en: 'Basic Peer Support Skills Training',
      zh: '基础同伴支持技能培训',
    },
    description: {
      en: 'Completed Basic Peer Support Skills Training under the Department of Student Services.',
      zh: '完成学生服务部门组织的基础同伴支持技能培训。',
    },
    period: 'Jan 2025',
    image: `images/activities/peer-support.png`,
  },
  {
    title: {
      en: 'SG Clean Day',
      zh: '新加坡清洁日',
    },
    description: {
      en: 'Participated in SG Clean Day as part of community volunteering.',
      zh: '参与新加坡清洁日社区志愿活动。',
    },
    period: 'May 2023',
    image: `images/activities/sg-cleanday.png`,
  },
]

export const contactItems: ContactItem[] = [
  {
    label: {
      en: 'Email',
      zh: '邮箱',
    },
    value: 'waiphyo.wpa424@gmail.com',
    href: 'mailto:waiphyo.wpa424@gmail.com',
  },
  {
    label: {
      en: 'LinkedIn',
      zh: '领英',
    },
    value: 'linkedin.com/in/wai-phyo-aung-wpa',
    href: 'https://linkedin.com/in/wai-phyo-aung-wpa',
  },
]