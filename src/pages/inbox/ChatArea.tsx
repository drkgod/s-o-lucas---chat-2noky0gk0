import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  MoreVertical,
  FileText,
  FileSearch,
  Headphones,
  Mic,
  Paperclip,
  ClipboardCheck,
  Clock,
  Droplet,
  Stethoscope,
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

  const simulateAIResponse = (text: string, delay = 2000, extraProps: Partial<Message> = {}) => {
    setIsTyping(true)
    setTimeout(() => {
      addMessage({
        id: Date.now().toString() + 'ai',
        text,
        sender: 'ai',
        timestamp: 'Agora',
        type: 'text',
        ...extraProps,
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
      'Olá! Você possui a requisição médica para esses exames? Pode enviar uma foto ou o arquivo (PDF).\n\nAproveito para informar que nosso laboratório possui a classificação "Padrão Ouro" pelo PNCQ, garantindo rigorosos padrões internacionais e máxima confiabilidade nos seus resultados.\n\nE para sua maior comodidade, oferecemos a Coleta Domiciliar. Que tal realizar seus exames com todo o conforto sem sair de casa?',
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
      'Olá! Sim, nós realizamos esses exames. Nosso laboratório é "Padrão Ouro" pelo PNCQ, o que garante máxima confiabilidade.\n\nPara o Hemograma e TSH, a instrução de preparo é de jejum de 8 a 12 horas. Você possui a requisição médica? Pode me enviar a foto.\n\nLembrando que oferecemos o serviço de Coleta Domiciliar!',
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
      'Identifiquei os seguintes exames na sua requisição e preparos:\n- Hemograma Completo (Jejum de 8 a 12h)\n- TSH (Jejum de 4h)\n- Vitamina D (Sem jejum)\n\nEstão corretos?\n\nVale lembrar que somos classificados como "Padrão Ouro" pelo PNCQ. Gostaria de agendar na clínica ou prefere nossa Coleta Domiciliar?',
      3000,
    )
  }

  const handleSimulateRegistration = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Quero agendar os exames.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Perfeito! Para agilizarmos o seu atendimento na clínica e garantirmos a nossa agilidade "Padrão Ouro", vou realizar o seu pré-cadastro agora. Assim, você não pega fila na recepção!\n\nPor favor, me informe:\n1. Nome Completo\n2. Data de Nascimento\n3. CPF\n4. Endereço Completo\n5. Forma de Atendimento (Plano de Saúde, Particular ou Convênio Parceiro?)\n\nTambém peço que envie uma foto ou PDF do seu documento de identidade com foto (RG ou CNH). Fornecer esses documentos nos permite agilizar o seu atendimento na chegada.',
      2500,
    )

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: '',
        sender: 'user',
        timestamp: 'Agora',
        type: 'audio',
        transcription:
          'Oi, meu nome é Maria Oliveira, nasci em 12 de maio de 1990, CPF 098.765.432-10. Eu moro na Avenida Paulista, 1000. Plano de saúde.',
      })
      setTimeout(() => {
        addMessage({
          id: (Date.now() + 2).toString(),
          text: '',
          sender: 'user',
          timestamp: 'Agora',
          type: 'image',
          fileUrl: 'https://img.usecurling.com/p/300/200?q=id%20card',
        })
        simulateAIResponse(
          'Obrigado, Maria! Como você escolheu "Plano de Saúde", poderia me informar qual é o nome do seu plano (ex: Unimed, Bradesco, Amil)?\n\nPor favor, envie também uma foto da sua carteirinha física ou um print da carteirinha digital. Fornecer esses documentos nos permite solicitar a autorização prévia junto ao convênio, agilizando muito o seu atendimento!',
          2500,
        )
      }, 1500)
    }, 7000)

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 3).toString(),
        text: 'É Amil.',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })
      setTimeout(() => {
        addMessage({
          id: (Date.now() + 4).toString(),
          text: '',
          sender: 'user',
          timestamp: 'Agora',
          type: 'image',
          fileUrl: 'https://img.usecurling.com/p/300/200?q=health%20insurance%20card',
        })
        simulateAIResponse(
          'Tudo certo! Para finalizar o seu pré-cadastro e fornecer o contexto correto para o laboratório, preciso de algumas informações clínicas rápidas:\n\nÉ diabético?',
          2500,
          { options: ['Sim', 'Não'] },
        )

        setTimeout(() => {
          addMessage({
            id: (Date.now() + 5).toString(),
            text: 'Não',
            sender: 'user',
            timestamp: 'Agora',
            type: 'text',
          })
          simulateAIResponse('Entendido. É hipertenso?', 2000, { options: ['Sim', 'Não'] })

          setTimeout(() => {
            addMessage({
              id: (Date.now() + 6).toString(),
              text: 'Não',
              sender: 'user',
              timestamp: 'Agora',
              type: 'text',
            })
            simulateAIResponse('Certo. Por fim, qual o motivo da realização dos exames?', 2000, {
              options: [
                'Avaliação clínica',
                'Pré-operatório',
                'Investigação de alguma doença',
                'Pré-natal',
                'Check-up',
                'Outros',
              ],
            })

            setTimeout(() => {
              addMessage({
                id: (Date.now() + 7).toString(),
                text: 'Check-up',
                sender: 'user',
                timestamp: 'Agora',
                type: 'text',
              })

              simulateAIResponse(
                'Tudo pronto! Confirme os dados do seu pré-cadastro abaixo:',
                2500,
                {
                  type: 'registration_card',
                  registrationData: {
                    name: 'Maria Oliveira',
                    dob: '12/05/1990',
                    cpf: '098.765.432-10',
                    address: 'Avenida Paulista, 1000',
                    coverageType: 'Plano de Saúde',
                    coverageName: 'Amil',
                    idDocumentProvided: true,
                    insuranceCardProvided: true,
                    isDiabetic: false,
                    isHypertensive: false,
                    examReason: 'Check-up',
                  },
                },
              )
              setTimeout(() => {
                setChats((prev) =>
                  prev.map((c) =>
                    c.id === chat.id
                      ? {
                          ...c,
                          patientData: {
                            name: 'Maria Oliveira',
                            dob: '12/05/1990',
                            cpf: '098.765.432-10',
                            address: 'Avenida Paulista, 1000',
                            coverageType: 'Plano de Saúde',
                            coverageName: 'Amil',
                            idDocumentProvided: true,
                            insuranceCardProvided: true,
                            isDiabetic: false,
                            isHypertensive: false,
                            examReason: 'Check-up',
                          },
                        }
                      : c,
                  ),
                )
              }, 3000)
            }, 6000)
          }, 6000)
        }, 6000)
      }, 1500)
    }, 16000)
  }

  const handleSimulateUrineTest = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Preciso fazer um Sumário de Urina e Cultura de Urina. Tem algum preparo?',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Olá! Sim, para o Sumário de Urina e a Cultura de Urina, temos algumas instruções importantes para garantir a qualidade "Padrão Ouro" do PNCQ dos nossos resultados:\n\n- Utilizar coletor estéril.\n- Coletar segundo jato de urina após higienizar a região íntima.\n- Secar bem antes de coletar.\n\nInformamos que o laboratório disponibiliza o coletor estéril de forma gratuita! Você pode passar em qualquer uma de nossas unidades para retirar o seu antes da coleta.\n\nDeseja agendar a entrega do material?',
      2500,
    )
  }

  const handleSimulateRegistrationDropoff = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Vamos fechar.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Excelente! Para o nosso serviço "Padrão Ouro", me informe para o pré-cadastro:\n1. Nome 2. Data Nasc. 3. CPF 4. Endereço 5. Forma de Atendimento',
      2000,
    )
    setTimeout(() => {
      simulateAIResponse(
        'Olá! Percebi que você não concluiu o envio dos dados. Posso ajudar? O pré-cadastro agiliza muito o seu atendimento na clínica! (Acompanhamento 1/12)',
        5000,
      )
      setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, followUpStep: 1 } : c)))
    }, 7000)
  }

  const handleSimulatePreventive = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Oi, a médica pediu para eu fazer um Hemograma e um Sumário de Urina.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })

    simulateAIResponse(
      'Olá! Identifiquei os seus exames: Hemograma Completo (R$ 45,00) e Sumário de Urina (R$ 25,00).\n\nComo parte do nosso cuidado "Padrão Ouro" com a saúde da mulher, notei que não há solicitação para o exame Preventivo (também conhecido como Papanicolau ou Citologia Oncótica).\n\nFaz mais de um ano desde que você realizou seu último exame preventivo?',
      2500,
      { options: ['Sim, faz mais de um ano', 'Não, fiz recentemente'] },
    )

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: 'Sim, faz mais de um ano',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })

      simulateAIResponse(
        'Entendo! O Preventivo é uma medida fundamental para a prevenção do câncer de colo de útero. Aproveitando que você já fará outros exames conosco, gostaria de incluir o Preventivo (Papanicolau) no seu pedido de hoje? Isso ajuda a poupar o seu tempo e garante que seu rastreio de saúde fique em dia!',
        2500,
        { options: ['Sim, pode incluir', 'Não, apenas os que a médica pediu'] },
      )

      setTimeout(() => {
        addMessage({
          id: (Date.now() + 2).toString(),
          text: 'Sim, pode incluir',
          sender: 'user',
          timestamp: 'Agora',
          type: 'text',
        })

        simulateAIResponse(
          'Excelente escolha para a sua saúde! Adicionei o Preventivo (Citologia Oncótica) ao seu pedido.\n\nAqui está o seu orçamento atualizado:\n- Hemograma Completo: R$ 45,00\n- Sumário de Urina: R$ 25,00\n- Preventivo (Papanicolau): R$ 80,00\n\nTotal atualizado: R$ 150,00\n\nPara garantir a precisão do seu Preventivo (Papanicolau), por favor, siga estas orientações de preparo importantes:\n- Não realizar o exame em período menstrual sendo as melhores datas após o 10º dia do ciclo, ideal 14 15 dia do ciclo.\n- Manter um mínimo de 48h após relação sexual.\n- Não utilizar duchas vaginais, medicação ou cremes nas 48h antes da coleta do exame.\n\nAlém disso, lembre-se das instruções para os exames de Urina que já havíamos conversado.\n\nDeseja agendar o seu atendimento na clínica ou prefere utilizar o nosso serviço de Coleta Domiciliar?',
          2500,
        )
      }, 6000)
    }, 6000)
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
            const isImage = m.type === 'image'
            const isRegistrationCard = m.type === 'registration_card'

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
                              Transcrição (IA)
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
                              Leitura de Documento (IA)
                            </span>
                            <span className="whitespace-pre-line">{m.transcription}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isImage && m.fileUrl && (
                    <div className="flex flex-col gap-2 min-w-[200px] mt-1 mb-1">
                      <img
                        src={m.fileUrl}
                        alt="Anexo"
                        className="rounded-lg object-cover max-h-[200px] border border-border/20 shadow-sm"
                      />
                    </div>
                  )}
                  {!isAudio && !isDocument && !isImage && !isRegistrationCard && (
                    <span className="whitespace-pre-wrap">{m.text}</span>
                  )}
                  {m.options && m.options.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1.5 w-full">
                      {m.options.map((opt, i) => (
                        <div
                          key={i}
                          className="bg-primary/5 border border-primary/20 rounded-md px-3 py-2 text-center text-sm font-medium text-primary shadow-sm"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {isRegistrationCard && m.registrationData && (
                    <div className="mt-3 flex flex-col gap-2 bg-background p-3 rounded-lg border border-border/50 shadow-sm text-sm w-full min-w-[260px]">
                      <div className="flex items-center gap-2 mb-1 border-b pb-2">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary text-sm">
                          Pré-cadastro Preenchido
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 text-xs mt-1">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                            Nome Completo
                          </span>
                          <span className="font-medium">{m.registrationData.name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                            Data de Nascimento
                          </span>
                          <span className="font-medium">{m.registrationData.dob}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                            CPF
                          </span>
                          <span className="font-medium">{m.registrationData.cpf}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                            Endereço
                          </span>
                          <span className="font-medium">{m.registrationData.address}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                            Tipo de Cobertura
                          </span>
                          <span className="font-medium">
                            {m.registrationData.coverageType}{' '}
                            {m.registrationData.coverageName
                              ? `- ${m.registrationData.coverageName}`
                              : ''}
                          </span>
                        </div>
                        {(m.registrationData.isDiabetic !== undefined ||
                          m.registrationData.examReason) && (
                          <>
                            <div className="flex flex-col mt-1">
                              <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                                Perfil Clínico
                              </span>
                              <span className="font-medium">
                                {m.registrationData.isDiabetic ? 'Diabético' : 'Não Diabético'} •{' '}
                                {m.registrationData.isHypertensive
                                  ? 'Hipertenso'
                                  : 'Não Hipertenso'}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                                Motivo dos Exames
                              </span>
                              <span className="font-medium">{m.registrationData.examReason}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="mt-2 pt-2 border-t flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs px-2 pointer-events-none"
                        >
                          Editar Dados
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs px-2 bg-primary text-primary-foreground pointer-events-none"
                        >
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  )}
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
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateRegistration}
          >
            <ClipboardCheck className="h-3 w-3 mr-1" /> Pré-cadastro
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateUrineTest}
          >
            <Droplet className="h-3 w-3 mr-1" /> Exame de Urina
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulatePreventive}
          >
            <Stethoscope className="h-3 w-3 mr-1" /> Upsell Preventivo
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 font-normal shrink-0 bg-primary/10 text-primary border-primary/20"
            onClick={handleSimulateRegistrationDropoff}
          >
            <Clock className="h-3 w-3 mr-1" /> Abandono Cad.
          </Badge>
        </div>
      </div>
    </div>
  )
}
