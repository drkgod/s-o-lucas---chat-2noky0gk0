import { Search, MessageCircle, Instagram, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'

export default function ChatList({ className }: { className?: string }) {
  const { chats, activeChatId, setActiveChatId } = useAppStore()

  return (
    <div className={cn('flex flex-col bg-card', className)}>
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">Mensagens</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar conversas..." className="pl-9 bg-muted/50" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2 gap-1">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId
            const lastMsg = chat.messages[chat.messages.length - 1]
            return (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg text-left transition-all hover:bg-muted/50',
                  isActive && 'bg-muted shadow-sm',
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatarUrl} />
                    <AvatarFallback>{chat.contactName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background',
                      chat.platform === 'whatsapp' ? 'bg-whatsapp' : 'bg-instagram-gradient',
                    )}
                  >
                    {chat.platform === 'whatsapp' ? (
                      <MessageCircle className="h-3 w-3 text-white" />
                    ) : (
                      <Instagram className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate text-sm">{chat.contactName}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {lastMsg?.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {lastMsg?.type === 'audio'
                      ? '🎵 Mensagem de áudio'
                      : lastMsg?.type === 'document'
                        ? '📄 Documento anexado'
                        : lastMsg?.type === 'image'
                          ? '🖼️ Imagem anexada'
                          : lastMsg?.text}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Badge
                        variant="secondary"
                        className="text-[9px] px-1.5 h-4 bg-muted-foreground/10 text-muted-foreground truncate"
                      >
                        {chat.lineName}
                      </Badge>
                      {(chat.followUpStep ?? 0) > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 h-4 border-amber-500/30 text-amber-600 dark:text-amber-500 bg-amber-500/10 whitespace-nowrap"
                        >
                          Follow-up {chat.followUpStep}/12
                        </Badge>
                      )}
                    </div>
                    {chat.status === 'pending_human' && (
                      <AlertCircle className="h-3.5 w-3.5 text-destructive animate-pulse shrink-0 ml-1" />
                    )}
                    {chat.unreadCount > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-medium shrink-0 ml-1">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
