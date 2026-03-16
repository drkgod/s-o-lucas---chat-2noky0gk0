export type Platform = 'whatsapp' | 'instagram'

export type MessageType = 'text' | 'audio' | 'document' | 'image' | 'registration_card'

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
