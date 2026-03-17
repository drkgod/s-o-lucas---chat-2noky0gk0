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
  HeartPulse,
  BookOpen,
  Download,
  BellRing,
  Stethoscope,
  ShieldCheck,
  Microscope,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
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
        text: 'É Amil.',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })
      setTimeout(() => {
        simulateAIResponse('Tudo pronto! Confirme os dados do seu pré-cadastro abaixo:', 2500, {
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
        })
      }, 2000)
    }, 4000)
  }

  const handleSimulateFAQPreventivo = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Vi que vocês fazem exame preventivo. Tenho algumas dúvidas, nunca fiz e estou um pouco insegura.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })

    simulateAIResponse(
      'Olá! Seja muito bem-vinda. Sim, realizamos o exame Preventivo (Papanicolau) com muito acolhimento e cuidado.\n\nÉ super normal ter dúvidas, principalmente na primeira vez. Pelo seu perfil, separei algumas das perguntas mais frequentes que recebemos de mulheres sobre este procedimento. Dê uma olhadinha:',
      2500,
      {
        faqData: [
          {
            question: 'O exame preventivo dói?',
            answer:
              'O exame não deve doer. Pode causar um leve desconforto ou pressão, mas é um procedimento rápido. Conversar com o profissional e tentar relaxar a musculatura pélvica ajuda muito!',
          },
          {
            question: 'Qual a importância do exame?',
            answer:
              'Ele é o principal método de rastreio e detecção precoce de alterações nas células do colo do útero, prevenindo o desenvolvimento do câncer.',
          },
          {
            question: 'Com que frequência devo realizar?',
            answer:
              'Geralmente, anualmente. Após dois exames anuais normais consecutivos, a frequência pode passar para a cada três anos, mas sempre siga a recomendação do seu médico.',
          },
        ],
      },
    )

    setTimeout(() => {
      simulateAIResponse(
        'Para ajudar você a descomplicar de vez esse cuidado com a sua saúde e se sentir ainda mais confiante, nós preparamos um material educativo exclusivo e gratuito.\n\nAproveite e baixe agora mesmo, mesmo que você ainda não agende conosco hoje:',
        3000,
        {
          ebookData: {
            title: 'Seu exame preventivo descomplicado',
            author: 'Dr. Rafael Toledo',
            coverUrl:
              'https://img.usecurling.com/p/200/300?q=female%20health%20book%20cover&color=pink',
          },
        },
      )
    }, 8000)
  }

  const handleSimulateLembrete72h = () => {
    simulateAIResponse(
      'Olá! 🌸 \n\nLembrete Automático: O seu exame Preventivo (Papanicolau) está agendado para daqui a exatamente 72 horas.\n\nPara garantir a precisão dos seus resultados e evitar a necessidade de recoleta, é **fundamental** que você siga rigorosamente estas 3 instruções de preparo a partir de hoje:\n\n1️⃣ **Ciclo Menstrual**: Não realizar o exame em período menstrual (lembrando que as melhores datas são após o 10º dia do ciclo, sendo o ideal no 14º ou 15º dia).\n2️⃣ **Abstinência**: Mantenha um mínimo de 48 horas de abstinência sexual prévia à coleta.\n3️⃣ **Produtos Vaginais**: Não utilizar duchas vaginais, medicações locais ou cremes nas 48 horas anteriores à coleta do exame.\n\nSe tiver qualquer dúvida sobre o preparo ou precisar reagendar, basta me avisar por aqui!',
      1000,
    )
  }

  const handleSimulateConsultativeSales = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Oi, preciso fazer os exames dessa guia: Hemograma e TSH.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Olá! Identifiquei os exames Hemograma Completo e TSH na sua requisição. O valor total fica R$ 65,00.\n\nNotamos que para um acompanhamento mais completo da sua saúde, faltam alguns exames essenciais de rotina recomendados, como Vitamina D, Vitamina B12, Hemoglobina Glicada, Glicemia de Jejum, além do Perfil Lipídico, Hepático e Renal.\n\nComo nosso foco é o seu cuidado integral e prevenção, gostaria de incluí-los no seu orçamento para aproveitarmos a mesma coleta?',
      2500,
    )

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: 'Acho que vai ficar muito caro, prefiro fazer só os do médico mesmo.',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })

      setTimeout(() => {
        simulateAIResponse(
          'Entendo perfeitamente. O cuidado com a saúde às vezes pesa no orçamento. Posso perguntar se o motivo seria apenas o valor ou se há outra dúvida sobre a necessidade desses exames?',
          2500,
        )

        setTimeout(() => {
          addMessage({
            id: (Date.now() + 2).toString(),
            text: 'É mais pelo valor mesmo, no momento não dá.',
            sender: 'user',
            timestamp: 'Agora',
            type: 'text',
          })

          setTimeout(() => {
            simulateAIResponse(
              'Compreendo totalmente. Pensando no seu bem-estar e para que não deixe de cuidar da sua saúde por completo, consigo aplicar um desconto especial de 15% exclusivamente nesses exames adicionais.\n\nAlém disso, posso parcelar o valor total do orçamento em até 3x sem juros no cartão.\n\nO que acha de aproveitarmos essa facilidade?',
              3000,
            )

            setTimeout(() => {
              addMessage({
                id: (Date.now() + 3).toString(),
                text: 'Ah, com esse desconto e podendo parcelar fica bom, pode incluir.',
                sender: 'user',
                timestamp: 'Agora',
                type: 'text',
              })

              setTimeout(() => {
                simulateAIResponse(
                  'Fico muito feliz que tenha decidido priorizar sua saúde preventiva! 💙\n\nO novo orçamento atualizado ficou assim:\n- Hemograma Completo: R$ 45,00\n- TSH: R$ 20,00\n- Exames Check-up Integral (c/ 15% desc.): R$ 102,00\n\nTotal: R$ 167,00 (em até 3x de R$ 55,66 sem juros)\n\nPodemos prosseguir com o agendamento?',
                  3000,
                )
              }, 3000)
            }, 6000)
          }, 3000)
        }, 5000)
      }, 3000)
    }, 6000)
  }

  const handleSimulatePSA = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Olá, gostaria de fazer apenas um hemograma de rotina.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })
    simulateAIResponse(
      'Olá! Claro, o valor do Hemograma Completo é R$ 45,00.\n\nNotei no seu perfil que você tem mais de 40 anos. Como o nosso foco é o cuidado integral com a sua saúde, gostaria de sugerir também a inclusão dos exames PSA Total e PSA Livre.\n\nO câncer de próstata é o tipo de câncer mais comum entre os homens, e a prevenção e o diagnóstico precoce são sempre o melhor caminho. Gostaria de incluí-los no seu orçamento para aproveitarmos a mesma coleta?',
      2500,
    )

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: 'Poxa, acho que vai ficar meio caro agora, vou fazer só o hemograma mesmo.',
        sender: 'user',
        timestamp: 'Agora',
        type: 'text',
      })

      setTimeout(() => {
        simulateAIResponse(
          'Compreendo perfeitamente. O cuidado com a saúde às vezes pesa no orçamento. Posso perguntar se o motivo seria apenas o valor ou se há outra dúvida sobre a necessidade desses exames?',
          2500,
        )

        setTimeout(() => {
          addMessage({
            id: (Date.now() + 2).toString(),
            text: 'É pelo valor mesmo, as coisas estão meio apertadas.',
            sender: 'user',
            timestamp: 'Agora',
            type: 'text',
          })

          setTimeout(() => {
            simulateAIResponse(
              'Entendo totalmente. Pensando no seu bem-estar e para que você não deixe de realizar essa prevenção tão importante, consigo aplicar um desconto especial de 20% exclusivamente nesses exames (PSA Total e PSA Livre).\n\nAlém disso, posso parcelar o valor total do orçamento em até 3x sem juros no cartão.\n\nO que acha dessa facilidade?',
              3000,
            )

            setTimeout(() => {
              addMessage({
                id: (Date.now() + 3).toString(),
                text: 'Ah, com desconto e parcelando fica bem mais fácil. Pode incluir sim!',
                sender: 'user',
                timestamp: 'Agora',
                type: 'text',
              })

              setTimeout(() => {
                simulateAIResponse(
                  'Excelente decisão! Priorizar a sua saúde preventiva é fundamental. 💙\n\nO seu orçamento atualizado ficou assim:\n- Hemograma Completo: R$ 45,00\n- PSA Total e PSA Livre (c/ 20% desc.): R$ 72,00\n\nTotal: R$ 117,00 (em até 3x de R$ 39,00 sem juros)\n\nPodemos prosseguir com o agendamento?',
                  3000,
                )
              }, 3000)
            }, 6000)
          }, 3000)
        }, 5000)
      }, 3000)
    }, 6000)
  }

  const handleSimulateSpermogram = () => {
    addMessage({
      id: Date.now().toString(),
      text: 'Olá, gostaria de agendar um espermograma.',
      sender: 'user',
      timestamp: 'Agora',
      type: 'text',
    })

    simulateAIResponse(
      'Olá! Parabéns por buscar essa avaliação tão importante para a saúde masculina e reprodutiva. É um passo fundamental para o seu cuidado integral e estamos aqui para te apoiar! 💙\n\nAqui em nossa clínica, o Espermograma é realizado sob a supervisão direta do **Dr. Rafael Toledo**, especialista em infertilidade e reprodução humana. Ele é um verdadeiro expert neste exame, sendo referência em todo o estado de Alagoas e o primeiro biomédico especialista nesta área por aqui!',
      2500,
    )

    setTimeout(() => {
      simulateAIResponse(
        'Para garantir a máxima excelência e precisão dos seus resultados, utilizamos a metodologia de **Morfologia Estrita de Kruger** no processamento do seu exame.\n\nAntes de seguirmos com o agendamento, preciso passar algumas instruções de preparo (pré-analíticas) que são estritamente necessárias para a qualidade da amostra:\n\n1️⃣ **Abstinência Sexual**: É obrigatório manter um período de 2 a 5 dias de abstinência sexual.\n2️⃣ **Coleta**: Você deve coletar o volume total do ejaculado (todos os jatos). É muito importante que nenhum volume do esperma seja perdido durante a coleta.',
        3000,
      )

      setTimeout(() => {
        simulateAIResponse(
          'Sobre a entrega do material, oferecemos duas opções para sua maior comodidade:\n\n📍 **No Laboratório**: Em uma sala adequada e preparada.\n🏠 **Em Casa**: Caso prefira, você pode coletar em casa, mas a amostra deve ser entregue no laboratório em no **máximo 30 minutos**.\n⚠️ *Atenção:* Em hipótese alguma refrigere a amostra. Ela deve ser transportada em temperatura ambiente.\n\nPor fim, informo que enviaremos um breve **questionário de anamnese** que deve ser respondido e devolvido ao laboratório junto com a amostra.\n\nQual opção de local para coleta você prefere?',
          4000,
        )
      }, 6500)
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

                  {m.faqData && m.faqData.length > 0 && (
                    <div className="mt-4 w-full min-w-[280px]">
                      <h4 className="text-[11px] font-bold uppercase mb-2 flex items-center gap-1.5 opacity-70 text-foreground">
                        <HeartPulse className="h-3.5 w-3.5" /> FAQ - Saúde da Mulher
                      </h4>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full bg-background rounded-md border text-left overflow-hidden shadow-sm"
                      >
                        {m.faqData.map((faq, i) => (
                          <AccordionItem
                            key={i}
                            value={`item-${i}`}
                            className="border-b last:border-0 border-border/50"
                          >
                            <AccordionTrigger className="text-[13px] font-medium py-2.5 px-3 hover:bg-muted/50 text-foreground transition-colors text-left data-[state=open]:bg-muted/50">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-[12px] text-muted-foreground px-3 pb-3 pt-1">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}

                  {m.ebookData && (
                    <div className="mt-4 flex items-center gap-3 bg-background p-3 rounded-xl border border-border/50 shadow-sm w-full min-w-[260px] text-foreground">
                      <div className="h-[72px] w-[52px] bg-primary/10 rounded overflow-hidden shrink-0 border border-primary/20 relative">
                        {m.ebookData.coverUrl ? (
                          <img
                            src={m.ebookData.coverUrl}
                            className="absolute inset-0 object-cover h-full w-full"
                            alt="Capa E-book"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 py-0.5">
                        <span className="text-[13px] font-bold leading-tight line-clamp-2 text-foreground/90">
                          {m.ebookData.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-1 mb-2 font-medium">
                          Por {m.ebookData.author}
                        </span>
                        <Button
                          size="sm"
                          className="h-7 text-[11px] px-3 w-full justify-start gap-2 bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 hover:text-pink-700 dark:bg-pink-500/20 dark:text-pink-400 dark:hover:bg-pink-500/30 border-0 shadow-none"
                        >
                          <Download className="h-3.5 w-3.5" /> Acessar E-book
                        </Button>
                      </div>
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
                      <div className="grid grid-cols-1 gap-1.5 text-xs mt-1 text-foreground">
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
            className="cursor-pointer hover:bg-blue-500/20 font-medium shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            onClick={handleSimulatePSA}
          >
            <ShieldCheck className="h-3 w-3 mr-1" /> Saúde Masculina (PSA)
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-indigo-500/20 font-medium shrink-0 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
            onClick={handleSimulateSpermogram}
          >
            <Microscope className="h-3 w-3 mr-1" /> Espermograma
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-emerald-500/20 font-medium shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
            onClick={handleSimulateConsultativeSales}
          >
            <Stethoscope className="h-3 w-3 mr-1" /> Venda Consultiva
          </Badge>
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
            className="cursor-pointer hover:bg-pink-500/20 font-medium shrink-0 bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20"
            onClick={handleSimulateFAQPreventivo}
          >
            <BookOpen className="h-3 w-3 mr-1" /> Edu Preventivo
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-orange-500/20 font-medium shrink-0 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
            onClick={handleSimulateLembrete72h}
          >
            <BellRing className="h-3 w-3 mr-1" /> Lembrete 72h
          </Badge>
        </div>
      </div>
    </div>
  )
}
