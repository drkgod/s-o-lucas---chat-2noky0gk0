export type Platform = 'whatsapp' | 'instagram'

export type MessageType =
  | 'text'
  | 'audio'
  | 'document'
  | 'image'
  | 'registration_card'
  | 'faq'
  | 'ebook'

export interface RegistrationData {
  name?: string
  dob?: string
  cpf?: string
  address?: string
  coverageType?: string
  coverageName?: string
  idDocumentProvided?: boolean
  insuranceCardProvided?: boolean
  isDiabetic?: boolean
  isHypertensive?: boolean
  examReason?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface EbookData {
  title: string
  author: string
  coverUrl?: string
  downloadUrl?: string
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'human'
  timestamp: string
  type?: MessageType
  fileUrl?: string
  transcription?: string
  registrationData?: RegistrationData
  options?: string[]
  faqData?: FaqItem[]
  ebookData?: EbookData
}

export interface Chat {
  id: string
  contactName: string
  platform: Platform
  lineName: string
  messages: Message[]
  unreadCount: number
  status: 'active' | 'resolved' | 'pending_human'
  avatarUrl?: string
  notes?: string
  history?: string[]
  followUpStep?: number
  lastActivity?: string
  surveyResult?: number
  lostReason?: 'price' | 'payment_method' | 'availability' | 'competitor' | 'other'
  patientData?: RegistrationData
}

export interface ServiceItem {
  id: string
  category: 'exam' | 'consultation' | 'test'
  name: string
  price: string
  instructions: string
}

export interface PatientExam {
  id: string
  name: string
  date: string
  result: string
  status: 'Concluído' | 'Pendente' | 'Agendado'
}

export interface PatientChat {
  id: string
  date: string
  summary: string
  status: 'Resolvido' | 'Pendente'
}

export interface Patient {
  id: string
  name: string
  contact: string
  email?: string
  cpf?: string
  lastExam: string
  date: string
  status: string
  exams?: PatientExam[]
  chats?: PatientChat[]
}
