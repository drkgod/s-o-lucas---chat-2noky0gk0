import { useState, useEffect, useRef } from 'react'
import { Bot, Send, User, HandIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { useAuth } from '@/hooks/use-auth'
import { getMessages, sendMessage, takeCall } from '@/services/inbox'
import { useRealtime } from '@/hooks/use-realtime'
import pb from '@/lib/pocketbase/client'

export default function ChatArea({ className }: { className?: string }) {
  const { activeChatId } = useAppStore()
  const { user } = useAuth()

  const [messages, setMessages] = useState<any[]>([])
  const [conversation, setConversation] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const loadMessages = async () => {
    if (!activeChatId) return
    try {
      setLoading(true)
      const [msgsRes, convRes] = await Promise.all([
        getMessages(activeChatId),
        pb.collection('conversations').getOne(activeChatId),
      ])
      setMessages(msgsRes)
      setConversation(convRes)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }

  useEffect(() => {
    loadMessages()
  }, [activeChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useRealtime('messages', (e) => {
    if (e.record.conversation === activeChatId) {
      loadMessages()
    }
  })

  useRealtime('conversations', (e) => {
    if (e.record.id === activeChatId) {
      setConversation(e.record)
    }
  })

  const handleSend = async () => {
    if (!inputValue.trim() || !activeChatId) return
    try {
      await sendMessage(activeChatId, inputValue.trim(), user?.name || 'Atendente')
      setInputValue('')
    } catch (e) {
      console.error(e)
    }
  }

  const handleTakeCall = async () => {
    if (!activeChatId || !user) return
    try {
      await takeCall(activeChatId, user.id)
    } catch (e) {
      console.error(e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!activeChatId) {
    return (
      <div className={cn('flex flex-col items-center justify-center bg-muted/20', className)}>
        <p className="text-muted-foreground text-sm">Selecione uma conversa para iniciar</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col bg-background relative', className)}>
      <div className="flex items-center justify-between px-6 py-4 border-b bg-card shadow-sm z-10">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-primary">
            {conversation?.patient_name || 'Carregando...'}
          </h2>
          <p className="text-sm text-muted-foreground">{conversation?.patient_whatsapp}</p>
        </div>
        <div>
          {conversation?.status === 'aguardando_humano' && (
            <Button onClick={handleTakeCall} className="bg-green-600 hover:bg-green-700 text-white">
              <HandIcon className="w-4 h-4 mr-2" /> Pegar Atendimento
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 bg-[url('https://img.usecurling.com/p/800/800?q=subtle-pattern&color=gray')] bg-cover bg-center bg-opacity-5 relative p-4">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-[1px] -z-10"></div>
        <div className="relative space-y-4 max-w-4xl mx-auto flex flex-col z-0 py-4">
          {loading ? (
            <div className="space-y-4 p-4">
              <Skeleton className="h-16 w-2/3 ml-auto rounded-2xl" />
              <Skeleton className="h-16 w-2/3 mr-auto rounded-2xl" />
              <Skeleton className="h-16 w-1/2 ml-auto rounded-2xl" />
            </div>
          ) : (
            messages.map((msg) => {
              const isPatient = msg.author === 'paciente'
              const isAi = msg.author === 'ia'
              const isAttendant = msg.author === 'atendente'

              return (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] animate-in fade-in slide-in-from-bottom-2 duration-300',
                    isPatient ? 'ml-auto items-end' : 'mr-auto items-start',
                  )}
                >
                  {(isAi || isAttendant) && (
                    <span className="text-[10px] text-muted-foreground ml-1 flex items-center gap-1 font-semibold">
                      {isAi ? (
                        <Bot className="w-3 h-3 text-secondary-foreground" />
                      ) : (
                        <User className="w-3 h-3 text-green-600" />
                      )}
                      {msg.sender_name || (isAi ? 'IA Assistente' : 'Atendente')}
                    </span>
                  )}
                  <div
                    className={cn(
                      'px-4 py-3 shadow-sm text-[15px] leading-relaxed',
                      isPatient
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                        : isAi
                          ? 'bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm'
                          : 'bg-green-600 text-white rounded-2xl rounded-tl-sm',
                    )}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(msg.created).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </ScrollArea>

      <div className="p-4 bg-card border-t z-10">
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <div className="flex-1 border bg-muted/40 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                conversation?.status === 'triagem_ia'
                  ? 'Aguardando triagem da IA...'
                  : 'Digite sua mensagem...'
              }
              disabled={conversation?.status === 'triagem_ia'}
              className="w-full bg-transparent min-h-[44px] max-h-[120px] px-4 py-3 text-sm focus:outline-none resize-none overflow-y-auto block disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || conversation?.status === 'triagem_ia'}
            size="icon"
            className="rounded-full w-11 h-11 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
