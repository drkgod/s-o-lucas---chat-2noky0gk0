export type Platform = 'whatsapp' | 'instagram'

export type MessageType = 'text' | 'audio' | 'document' | 'image'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'human'
  timestamp: string
  type?: MessageType
  fileUrl?: string
  transcription?: string
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
}

export interface ServiceItem {
  id: string
  category: 'exam' | 'consultation' | 'test'
  name: string
  price: string
  instructions: string
}
