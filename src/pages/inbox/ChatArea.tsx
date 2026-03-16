import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  CornerUpLeft,
  MoreVertical,
  FileText,
  FileSearch,
  Headphones,
  Mic,
  Paperclip,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { Message } from '@/lib/types'
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

  const addMessage = (msg: Message) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id
          ? { ...c, messages: [...c.messages, msg], status: 'active', followUpStep: 0 }
          : c,
      ),
    )
  }

  const simulateAIResponse = (text: string, delay = 2000) => {
    setIsTyping(true)
    setTimeout(() => {
      addMessage({
        id: Date.now().toString() + 'ai',
        text,
        sender: 'ai',
        timestamp: 'Agora',
        type: 'text',
      })
      setIsTyping(false)
    }, delay)
  }

  const handleSendText = () => {
    if (!inputText.trim()) return
    addMessage({
      id: Date.now().toString(),
      text: inputText,
      sender: 'human',
      timestamp: 'Agora',
      type: 'text',
    })
    setInputText('')
  }

  const handleSimulatePatientText = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Quero fazer uns exames que o médico pediu',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Olá! Você possui a requisição médica para esses exames? Pode enviar uma foto ou o arquivo (PDF).\n\nAproveito para informar que nosso laboratório possui a classificação "Padrão Ouro" pelo PNCQ (Programa Nacional de Controle de Qualidade), garantindo rigorosos padrões internacionais e máxima confiabilidade nos seus resultados.\n\nE para sua maior comodidade, oferecemos a Coleta Domiciliar. Que tal realizar seus exames com todo o conforto e conveniência sem sair de casa?',
    )
  }

  const handleSimulateAudio = () => {
    addMessage({
      id: Date.now().toString(),
      text: '',
      sender: 'user',
      timestamp: 'Agora',
      type: 'audio',
      transcription: 'Oi, eu queria saber se vocês fazem exame de sangue, tipo hemograma e TSH?',
    })
    simulateAIResponse(
      'Olá! Sim, nós realizamos esses exames. Nosso laboratório é "Padrão Ouro" pelo PNCQ, o que garante máxima confiabilidade e adesão a padrões internacionais de qualidade.\n\nPara o Hemograma e TSH, a instrução de preparo pré-analítico é de jejum de 8 a 12 horas. Você possui a requisição médica? Pode me enviar a foto ou arquivo por aqui.\n\nLembrando que oferecemos o serviço de Coleta Domiciliar, caso prefira o conforto e a conveniência de ser atendido na sua casa!',
      2500,
    )
  }

  const handleSimulateDocument = () => {
    addMessage({
      id: Date.now().toString(),
      text: '',
      sender: 'user',
      timestamp: 'Agora',
      type: 'document',
      transcription:
        'Conteúdo extraído via OCR:\n1. Hemograma Completo\n2. TSH\n3. Vitamina D\nDr. Augusto CRM 12345',
    })
    simulateAIResponse(
      'Identifiquei os seguintes exames na sua requisição e seus preparos pré-analíticos:\n- Hemograma Completo (Jejum de 8 a 12 horas)\n- TSH (Jejum de 4 horas)\n- Vitamina D (Não exige jejum)\n\nEstão corretos?\n\nVale lembrar que somos classificados como "Padrão Ouro" pelo PNCQ, assegurando rigorosos padrões internacionais de qualidade para os seus resultados. Gostaria de agendar na clínica ou prefere aproveitar o conforto e a conveniência da nossa Coleta Domiciliar?',
      3000,
    )
  }

  const handleSimulateRefusal = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Achei o valor alto, não vou fazer agora.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Entendo perfeitamente! Gostaria de pedir uma última chance para fecharmos. Você chegou a cotar em outro laboratório? Se sim, poderia me enviar uma foto ou PDF do orçamento? Vou conversar com o supervisor para ajustar uma melhor forma de atender, mas não irei deixar de atender.',
      2500,
    )
  }

  const handleSimulateCompetitor = () => {
    addMessage({
      id: Date.now().toString(),
      text: '',
      sender: 'user',
      timestamp: 'Agora',
      type: 'document',
      transcription:
        'Conteúdo extraído via OCR:\nOrçamento Laboratório Concorrente\nTotal: R$ 120,00',
    })
    simulateAIResponse(
      'Analisando o orçamento enviado... Vejo que a diferença está no valor total e nas condições de pagamento.\n\nFalei com meu supervisor e conseguimos cobrir esse valor de R$ 120,00 e ainda parcelar em até 3x sem juros para você. O que acha de fecharmos agora?',
      3500,
    )
  }

  const handleSimulateSurvey = () => {
    simulateAIResponse(
      'Seu atendimento foi concluído! Como você avalia sua experiência conosco de 1 a 5?\n\n1 - Muito Ruim\n2 - Ruim\n3 - Regular\n4 - Bom\n5 - Excelente',
      1000,
    )
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        text: '5',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })
      simulateAIResponse(
        'Agradecemos muito pela sua avaliação! Conte sempre com a Clínica Multicanal.',
        1500,
      )
    }, 4000)
  }

  return (
    <div className={cn('flex flex-col bg-background', className)}>
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

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="flex flex-col gap-6">
          {chat.messages.map((m) => {
            const isAI = m.sender === 'ai'
            const isUser = m.sender === 'user'
            const isAudio = m.type === 'audio'
            const isDocument = m.type === 'document'

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
                  {isAudio && (
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex items-center gap-3 bg-background/20 p-2 rounded-lg border border-primary-foreground/20">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full pointer-events-none text-foreground bg-background/80"
                        >
                          <Headphones className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 h-1.5 bg-primary-foreground/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-primary-foreground rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-medium opacity-80">0:14</span>
                      </div>
                      {m.transcription && (
                        <div className="mt-1 flex gap-2 items-start text-xs bg-background/20 p-2 rounded border border-primary-foreground/20">
                          <FileSearch className="h-3.5 w-3.5 mt-0.5 opacity-70 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-[9px] opacity-70 uppercase mb-0.5">
                              Transcrição de Áudio (IA)
                            </span>
                            <span className="italic">"{m.transcription}"</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isDocument && (
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex items-center gap-3 bg-background/20 p-3 rounded-lg border border-primary-foreground/20">
                        <div className="h-10 w-10 shrink-0 bg-background/80 text-foreground rounded flex items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Documento.pdf</span>
                          <span className="text-[10px] opacity-70">1.2 MB • PDF</span>
                        </div>
                      </div>
                      {m.transcription && (
                        <div className="mt-1 flex gap-2 items-start text-xs bg-background/20 p-2 rounded border border-primary-foreground/20">
                          <FileSearch className="h-3.5 w-3.5 mt-0.5 opacity-70 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-[9px] opacity-70 uppercase mb-0.5">
                              OCR / Leitura de Documento (IA)
                            </span>
                            <span className="whitespace-pre-line">{m.transcription}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {!isAudio && !isDocument && <span className="whitespace-pre-wrap">{m.text}</span>}
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

      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem ao paciente..."
            className="min-h-[60px] resize-none border-muted-foreground/20 shadow-none focus-visible:ring-primary/50 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendText()
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              onClick={handleSendText}
              className="h-full w-12 rounded-lg shrink-0 transition-transform active:scale-95"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar items-center">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase flex items-center mr-1 shrink-0">
            Simular (IA):
          </span>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulatePatientText}
          >
            <User className="h-3 w-3 mr-1" /> Pedir Exames
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateDocument}
          >
            <Paperclip className="h-3 w-3 mr-1" /> PDF (OCR)
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateAudio}
          >
            <Mic className="h-3 w-3 mr-1" /> Áudio
          </Badge>

          <span className="text-[10px] font-semibold text-muted-foreground uppercase flex items-center ml-2 mr-1 shrink-0 border-l pl-4">
            Recuperação/CSAT:
          </span>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-destructive/10 text-destructive border-destructive/20"
            onClick={handleSimulateRefusal}
          >
            <User className="h-3 w-3 mr-1" /> Recusar Preço
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateCompetitor}
          >
            <Paperclip className="h-3 w-3 mr-1" /> Enviar Concorrente
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-green-500/10 text-green-600 border-green-500/20"
            onClick={handleSimulateSurvey}
          >
            <Bot className="h-3 w-3 mr-1" /> Disparar CSAT
          </Badge>
        </div>
      </div>
    </div>
  )
}
