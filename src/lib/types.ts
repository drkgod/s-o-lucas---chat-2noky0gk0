export type Platform = 'whatsapp' | 'instagram'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'human'
  timestamp: string
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
}

export interface ServiceItem {
  id: string
  category: 'exam' | 'consultation' | 'test'
  name: string
  price: string
  instructions: string
}
