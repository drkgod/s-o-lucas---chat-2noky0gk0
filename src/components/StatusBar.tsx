import { CheckCircle2 } from 'lucide-react'

export default function StatusBar() {
  return (
    <div className="flex h-8 items-center justify-between border-t bg-muted/30 px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-whatsapp" />
          <span>
            WhatsApp Principal: <span className="font-medium text-foreground">Conectado</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-whatsapp" />
          <span>
            WhatsApp Agendamento: <span className="font-medium text-foreground">Conectado</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-instagram" />
          <span>
            Instagram Oficial: <span className="font-medium text-foreground">Conectado</span>
          </span>
        </div>
      </div>
      <div>
        <span>
          IA Agent: <span className="font-medium text-secondary">Ativo (v2.1)</span>
        </span>
      </div>
    </div>
  )
}
