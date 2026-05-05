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
      <div className={cn('flex flex-col items-center justify-center bg-slate-50', className)}>
        <Bot className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-slate-500 text-[14px] font-medium">
          Selecione uma conversa para iniciar o atendimento
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col bg-slate-50 relative', className)}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm z-10 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-[16px] md:text-[18px] font-bold text-slate-900">
            {conversation?.patient_name || 'Carregando...'}
          </h2>
          <p className="text-[12px] font-medium text-slate-500">{conversation?.patient_whatsapp}</p>
        </div>
        <div>
          {conversation?.status === 'aguardando_humano' && (
            <Button
              onClick={handleTakeCall}
              className="h-[44px] rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-shadow font-medium px-5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600"
              aria-label="Pegar Atendimento"
            >
              <HandIcon className="w-4 h-4 mr-2" /> Pegar Atendimento
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 relative p-6">
        <div className="relative space-y-6 max-w-4xl mx-auto flex flex-col z-0">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-[60px] w-2/3 ml-auto rounded-[16px] rounded-tr-sm" />
              <Skeleton className="h-[80px] w-2/3 mr-auto rounded-[16px] rounded-tl-sm" />
              <Skeleton className="h-[60px] w-1/2 ml-auto rounded-[16px] rounded-tr-sm" />
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isPatient = msg.author === 'paciente'
                const isAi = msg.author === 'ia'
                const isAttendant = msg.author === 'atendente'

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] animate-in fade-in slide-in-from-bottom-2 duration-300',
                      isPatient ? 'ml-auto items-end' : 'mr-auto items-start',
                    )}
                  >
                    {(isAi || isAttendant) && (
                      <span className="text-[12px] text-slate-500 ml-1 flex items-center gap-1.5 font-medium">
                        {isAi ? (
                          <Bot className="w-3.5 h-3.5" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-green-700" />
                        )}
                        {msg.sender_name || (isAi ? 'IA Assistente' : 'Atendente')}
                      </span>
                    )}
                    <div
                      className={cn(
                        'px-4 py-3 text-[14px] leading-relaxed shadow-sm',
                        isPatient
                          ? 'bg-blue-600 text-white rounded-[16px] rounded-tr-sm'
                          : isAi
                            ? 'bg-slate-200 text-slate-900 rounded-[16px] rounded-tl-sm'
                            : 'bg-green-100 text-slate-900 rounded-[16px] rounded-tl-sm',
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">
                      {new Date(msg.created).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )
              })}

              {conversation?.status === 'triagem_ia' && (
                <div className="flex flex-col gap-1.5 mr-auto items-start max-w-[75%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span className="text-[12px] text-slate-500 ml-1 flex items-center gap-1.5 font-medium">
                    <Bot className="w-3.5 h-3.5" /> IA Assistente
                  </span>
                  <div className="px-4 py-3 bg-slate-200 text-slate-900 rounded-[16px] rounded-tl-sm shadow-sm flex items-center gap-3 animate-pulse">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[14px] font-medium">Processando...</span>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </ScrollArea>

      <div className="p-4 bg-white border-t border-slate-200 z-10 shrink-0">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1 border border-slate-200 bg-white rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow shadow-sm">
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
              className="w-full bg-transparent min-h-[44px] max-h-[120px] px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none overflow-y-auto block disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50"
              rows={1}
              aria-label="Caixa de mensagem"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || conversation?.status === 'triagem_ia'}
            size="icon"
            className="h-[44px] w-[44px] rounded-lg shrink-0 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
