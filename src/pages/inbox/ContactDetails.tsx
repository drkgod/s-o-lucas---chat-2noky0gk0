import {
  FileText,
  User,
  Calendar,
  MapPin,
  Clock,
  Activity,
  Star,
  AlertCircle,
  ClipboardCheck,
  CheckCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function ContactDetails({ className }: { className?: string }) {
  const { activeChatId, chats } = useAppStore()
  const chat = chats.find((c) => c.id === activeChatId)

  if (!chat) {
    return <div className={cn('bg-muted/30', className)} />
  }

  return (
    <div className={cn('flex flex-col bg-card overflow-y-auto', className)}>
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" /> Detalhes do Paciente
        </h3>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>São Paulo, SP</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Última interação: {chat.lastActivity || 'Hoje'}</span>
          </div>
        </div>

        {chat.patientData && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                <ClipboardCheck className="h-3 w-3 text-primary" /> Dados do Pré-cadastro
              </h4>
              <div className="bg-primary/5 rounded-lg p-3 text-sm border border-primary/20">
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                      Nome Completo
                    </span>
                    <span className="font-medium">{chat.patientData.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                      Nascimento
                    </span>
                    <span className="font-medium">{chat.patientData.dob}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                      CPF
                    </span>
                    <span className="font-medium">{chat.patientData.cpf}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                      Endereço
                    </span>
                    <span className="font-medium">{chat.patientData.address}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                      Cobertura
                    </span>
                    <span className="font-medium">
                      {chat.patientData.coverageType}{' '}
                      {chat.patientData.coverageName ? `- ${chat.patientData.coverageName}` : ''}
                    </span>
                  </div>

                  <div className="flex flex-col col-span-full mt-2 space-y-2">
                    {chat.patientData.idDocumentProvided && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>Documento de Identidade (RG/CNH) recebido</span>
                      </div>
                    )}
                    {chat.patientData.insuranceCardProvided && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>Carteirinha do Convênio recebida (Autorização Prévia)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {chat.surveyResult && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                <Star className="h-3 w-3" /> Satisfação (CSAT)
              </h4>
              <div className="flex items-center gap-1 bg-muted/30 p-2 rounded-md border">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-4 w-4',
                      star <= (chat.surveyResult || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-muted-foreground/30',
                    )}
                  />
                ))}
                <span className="text-xs font-medium ml-2">{chat.surveyResult}/5 Estrelas</span>
              </div>
            </div>
          </>
        )}

        {chat.lostReason && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-3 w-3 text-destructive" /> Motivo da Perda / Objeção
              </h4>
              <Badge
                variant="outline"
                className="text-destructive border-destructive/30 bg-destructive/5 capitalize"
              >
                {chat.lostReason.replace('_', ' ')}
              </Badge>
            </div>
          </>
        )}

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Activity className="h-3 w-3" /> Status de Engajamento
          </h4>
          <div className="bg-muted/50 rounded-lg p-3 text-sm border border-border/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground text-xs">Acompanhamento:</span>
              <span className="font-medium text-xs">
                {(chat.followUpStep ?? 0) > 0
                  ? `Passo ${chat.followUpStep} de 12`
                  : 'Ativo / Sem pendência'}
              </span>
            </div>
            <Progress value={((chat.followUpStep ?? 0) / 12) * 100} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground mt-2 leading-tight">
              O sistema envia até 12 mensagens automatizadas para reengajar pacientes inativos e
              focar na conversão de exames.
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <FileText className="h-3 w-3" /> Notas Internas
          </h4>
          <Textarea
            defaultValue={chat.notes || ''}
            placeholder="Adicione observações importantes sobre o paciente..."
            className="min-h-[80px] text-sm resize-none"
          />
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-3 w-3" /> Histórico Rápido
          </h4>
          {chat.history && chat.history.length > 0 ? (
            <ul className="space-y-3 relative border-l-2 border-muted ml-2 pl-4">
              {chat.history.map((item, idx) => (
                <li key={idx} className="text-sm relative">
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">Nenhum histórico encontrado.</p>
          )}
        </div>
      </div>
    </div>
  )
}
