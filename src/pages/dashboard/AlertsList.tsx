import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'

export default function AlertsList() {
  const { chats, setActiveChatId } = useAppStore()
  const pendingChats = chats.filter((c) => c.status === 'pending_human')

  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Atenção Necessária
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {pendingChats.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            Nenhum chat pendente.
          </div>
        ) : (
          pendingChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between rounded-lg border p-3 bg-destructive/5 transition-colors hover:bg-destructive/10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{chat.contactName}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                  Última msg: {chat.messages[chat.messages.length - 1]?.text}
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] h-4">
                    {chat.platform === 'whatsapp' ? 'WhatsApp' : 'Instagram'}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{chat.lineName}</span>
                </div>
              </div>
              <Button size="sm" variant="ghost" asChild onClick={() => setActiveChatId(chat.id)}>
                <Link to="/inbox">
                  Atender <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
