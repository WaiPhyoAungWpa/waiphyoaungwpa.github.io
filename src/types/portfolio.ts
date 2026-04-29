type TranslatedText = {
  en: string
  zh: string
}

export type Skill = {
  name: string
  featured?: boolean
}

export type SkillGroup = {
  title: TranslatedText
  featured?: boolean
  skills: Skill[]
}

export type Experience = {
  company: string
  role: TranslatedText
  location: string
  period: string
  type: TranslatedText
  summary: TranslatedText
  image: string
  imageAlt: string
  details: TranslatedText[]
  tools: string[]
}

export type Project = {
  title: TranslatedText
  period: string
  type: TranslatedText
  description: TranslatedText
  stack: string[]
  image: string
  featured?: boolean
  details: TranslatedText[]
  photos: string[]
  videoUrl?: string
  instagramReelUrl?: string
}

export type EducationItem = {
  school: string
  qualification: TranslatedText
  period: string
  details: TranslatedText[]
}

export type Activity = {
  title: TranslatedText
  description: TranslatedText
  period: string
  image?: string
}

export type ContactItem = {
  label: TranslatedText
  value: string
  href: string
}