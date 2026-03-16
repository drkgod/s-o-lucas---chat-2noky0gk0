import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Chat } from '@/lib/types'
import { mockChats } from '@/lib/mock'

interface AppState {
  activeChatId: string | null
  setActiveChatId: (id: string | null) => void
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  hasAlert: boolean
  setHasAlert: (v: boolean) => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [hasAlert, setHasAlert] = useState<boolean>(false)

  return React.createElement(
    AppContext.Provider,
    { value: { activeChatId, setActiveChatId, chats, setChats, hasAlert, setHasAlert } },
    children,
  )
}

export default function useAppStore() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore must be used within AppProvider')
  return context
}
