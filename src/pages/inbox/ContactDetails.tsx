import { FileText, User, Calendar, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
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
            <span>Última interação: Hoje</span>
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
            className="min-h-[100px] text-sm resize-none"
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
