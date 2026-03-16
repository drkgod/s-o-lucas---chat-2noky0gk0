import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, CornerUpLeft, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function ChatArea({ className }: { className?: string }) {
  const { activeChatId, chats, setChats } = useAppStore()
  const chat = chats.find((c) => c.id === activeChatId)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chat?.messages, isTyping])

  if (!chat) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-slate-50/50 dark:bg-card',
          className,
        )}
      >
        <Bot className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
        <p className="text-muted-foreground text-sm">
          Selecione uma conversa para iniciar o atendimento
        </p>
      </div>
    )
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'human' as const,
      timestamp: 'Agora',
    }

    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id ? { ...c, messages: [...c.messages, newMsg], status: 'active' } : c,
      ),
    )
    setInputText('')

    // Simulate AI response if AI is active (mocking behavior)
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className={cn('flex flex-col bg-background', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={chat.avatarUrl} />
            <AvatarFallback>{chat.contactName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold leading-none">{chat.contactName}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Origem: {chat.platform === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <Bot
              className={cn(
                'h-4 w-4',
                chat.status !== 'pending_human' ? 'text-secondary' : 'text-muted-foreground',
              )}
            />
            <span className="text-xs font-medium">IA Agent</span>
            <Switch
              checked={chat.status !== 'pending_human'}
              onCheckedChange={() => {}}
              className="ml-2 scale-75"
            />
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="flex flex-col gap-6">
          {chat.messages.map((m, i) => {
            const isAI = m.sender === 'ai'
            const isUser = m.sender === 'user'
            return (
              <div
                key={m.id}
                className={cn(
                  'flex flex-col w-full max-w-[80%]',
                  isUser ? 'self-end items-end' : 'self-start items-start',
                )}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-1 pl-1">
                    {isAI ? (
                      <Bot className="h-3 w-3 text-secondary" />
                    ) : (
                      <User className="h-3 w-3 text-primary" />
                    )}
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">
                      {isAI ? 'Agente IA' : 'Atendente Humano'}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2.5 text-[15px] shadow-sm',
                    isUser
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : isAI
                        ? 'bg-muted text-foreground rounded-tl-sm border border-border/50'
                        : 'bg-secondary/10 border border-secondary/20 text-foreground rounded-tl-sm',
                  )}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">{m.timestamp}</span>
              </div>
            )
          })}
          {isTyping && (
            <div className="flex items-center gap-2 self-start bg-muted rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full typing-dot"></div>
                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full typing-dot"></div>
                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full typing-dot"></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem ou instrução..."
            className="min-h-[60px] resize-none border-muted-foreground/20 shadow-none focus-visible:ring-primary/50 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              onClick={handleSend}
              className="h-full w-12 rounded-lg shrink-0 transition-transform active:scale-95"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal shrink-0">
            <CornerUpLeft className="h-3 w-3 mr-1" /> Enviar Preparo Jejum
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal shrink-0">
            <CornerUpLeft className="h-3 w-3 mr-1" /> Link de Pagamento
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal shrink-0">
            <CornerUpLeft className="h-3 w-3 mr-1" /> Confirmar Agenda
          </Badge>
        </div>
      </div>
    </div>
  )
}
