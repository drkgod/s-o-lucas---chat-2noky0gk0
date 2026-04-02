import { useState } from 'react'
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  CheckCircle2,
  Bot,
  Clock,
  CheckCheck,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import logoUrl from '@/assets/logo-02-4a0a7.png'
import { SCENARIOS, ScenarioId } from './scenarios'

export default function ChatArea() {
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>('default')
  const scenario = SCENARIOS[activeScenarioId]

  return (
    <div className="flex flex-col h-full bg-background animate-fade-in relative z-0">
      <div className="bg-primary/5 border-b border-primary/10 px-6 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-primary font-medium">
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">Atendimento iniciado pela IA (Triagem concluída)</span>
          <span className="sm:hidden">IA Ativa</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Select
              value={activeScenarioId}
              onValueChange={(v) => setActiveScenarioId(v as ScenarioId)}
            >
              <SelectTrigger className="h-7 text-xs border-primary/20 bg-white w-[160px] sm:w-[220px]">
                <SelectValue placeholder="Selecione um cenário..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Chat Normal</SelectItem>
                <SelectItem value="scenario1">Simulação: Espermograma</SelectItem>
                <SelectItem value="scenario2">Simulação: Preventivo</SelectItem>
                <SelectItem value="scenario3">Simulação: Objeção de Qualidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-2 text-muted-foreground hidden lg:flex">
            <Clock className="w-4 h-4" />
            <span>Espera: 0 min</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-b bg-card shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
            <AvatarImage src={scenario.avatar} alt={scenario.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {scenario.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              {scenario.name}
              {scenario.verified && (
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 inline-block" /> Cliente Verificada
                </Badge>
              )}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(18,147,69,0.6)]"></span>
              WhatsApp • {scenario.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-primary/5 hidden sm:inline-flex"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-primary/5 hidden sm:inline-flex"
          >
            <Video className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
          <Button
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Assumir Atendimento
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-primary/5"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-[url('https://img.usecurling.com/p/800/800?q=subtle-pattern&color=gray')] bg-cover bg-center bg-opacity-5 relative">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-[1px]"></div>

        <div className="relative p-6 space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center my-4">
            <span className="bg-muted px-4 py-1 rounded-full text-xs font-medium text-muted-foreground border shadow-sm">
              Hoje, 16 de Março
            </span>
          </div>

          {scenario.messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex items-start gap-3 animate-fade-in-up">
                  <Avatar className="h-9 w-9 mt-1 shrink-0 shadow-sm">
                    <AvatarImage src={scenario.avatar} />
                    <AvatarFallback>{scenario.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                    <div className="bg-card border border-border/60 text-foreground rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm text-[15px] leading-relaxed">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium ml-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              )
            } else if (msg.sender === 'ai') {
              return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 flex-row-reverse animate-fade-in-up"
                >
                  <Avatar className="h-9 w-9 mt-1 shrink-0 border-2 border-primary/20 bg-white shadow-sm flex items-center justify-center p-1">
                    <img src={logoUrl} alt="SL" className="w-full h-full object-contain" />
                  </Avatar>
                  <div className="flex flex-col gap-1 items-end max-w-[85%] sm:max-w-[75%]">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-5 py-3 shadow-md text-[15px] leading-relaxed">
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <span className="text-[11px] text-muted-foreground font-medium text-right">
                        {msg.time}
                      </span>
                      <CheckCheck className="w-3.5 h-3.5 text-secondary" />
                    </div>
                  </div>
                </div>
              )
            } else if (msg.sender === 'action') {
              return (
                <div
                  key={msg.id}
                  className="flex flex-col items-end gap-2 max-w-[85%] sm:max-w-[75%] ml-auto -mt-4 pr-12 animate-fade-in-up"
                >
                  <div className="flex gap-2 flex-wrap justify-end">
                    {msg.actions?.map((action, i) => (
                      <Button
                        key={i}
                        variant={i === 0 ? 'outline' : 'default'}
                        size="sm"
                        className={
                          i === 0
                            ? 'bg-card border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full text-xs'
                            : 'bg-secondary hover:bg-secondary/90 text-white rounded-full text-xs'
                        }
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
      </ScrollArea>

      <div className="p-4 bg-card border-t shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)] z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-1 text-muted-foreground px-2 pb-1">
            <span className="text-xs font-medium mr-2">Modo: Supervisão da IA</span>
            <div className="w-px h-3 bg-border mx-2"></div>
            <Button variant="ghost" size="sm" className="h-6 text-xs hover:text-primary px-2">
              Usar Template
            </Button>
            <Button variant="ghost" size="sm" className="h-6 text-xs hover:text-primary px-2">
              Anexar Exame
            </Button>
          </div>

          <div className="flex items-end gap-3">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full w-10 h-10 border-border text-muted-foreground hover:text-primary hover:bg-primary/5"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 bg-muted/40 border border-input focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-2xl transition-all overflow-hidden relative">
              <textarea
                placeholder="Digite uma mensagem para assumir o atendimento ou orientar a IA..."
                className="w-full bg-transparent min-h-[44px] max-h-[120px] px-4 py-3 text-sm focus:outline-none resize-none overflow-y-auto block"
                rows={1}
              />
            </div>
            <Button
              size="icon"
              className="rounded-full w-12 h-12 bg-secondary hover:bg-secondary/90 text-white shrink-0 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Send className="h-5 w-5 ml-1" />
            </Button>
          </div>
          <div className="text-center mt-1">
            <p className="text-[10px] text-muted-foreground">
              Pressione <kbd className="font-sans px-1 py-0.5 rounded border bg-muted">Enter</kbd>{' '}
              para enviar,{' '}
              <kbd className="font-sans px-1 py-0.5 rounded border bg-muted">Shift + Enter</kbd>{' '}
              para nova linha
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
