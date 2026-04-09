export type Skill = {
  name: string
  featured?: boolean
}

export type SkillGroup = {
  title: string
  featured?: boolean
  skills: Skill[]
}

export type Experience = {
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

export type Project = {
  title: string
  period: string
  type: string
  description: string
  stack: string[]
  image: string
  featured?: boolean
  details: string[]
  photos: string[]
  videoUrl?: string
}

export type EducationItem = {
  school: string
  qualification: string
  period: string
  details: string[]
}

export type Activity = {
  title: string
  description: string
  image?: string
}

export type ContactItem = {
  label: string
  value: string
  href: string
}