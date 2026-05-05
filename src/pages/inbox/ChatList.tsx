import { useEffect, useState } from 'react'
import { Search, Bot, MessageSquareOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { useAuth } from '@/hooks/use-auth'
import { getConversations, getTenants } from '@/services/inbox'
import { useRealtime } from '@/hooks/use-realtime'

export default function ChatList({ className }: { className?: string }) {
  const { user } = useAuth()
  const { activeChatId, setActiveChatId } = useAppStore()

  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [tenantFilter, setTenantFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [tenants, setTenants] = useState<any[]>([])

  const canSeeTenants = ['admin', 'gestor', 'diretor'].includes(user?.role || '')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [convRes, tenantsRes] = await Promise.all([
        getConversations(1, buildFilter()),
        canSeeTenants ? getTenants() : Promise.resolve({ items: [] }),
      ])
      setConversations(convRes.items)
      if (canSeeTenants) setTenants(tenantsRes.items)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const buildFilter = () => {
    let f = []
    if (statusFilter !== 'all') f.push(`status = '${statusFilter}'`)
    if (tenantFilter !== 'all') f.push(`tenant = '${tenantFilter}'`)
    if (search) {
      f.push(`(patient_name ~ '${search}' || patient_whatsapp ~ '${search}')`)
    }
    return f.join(' && ')
  }

  useEffect(() => {
    loadData()
  }, [statusFilter, tenantFilter, search])

  useRealtime('conversations', () => {
    loadData()
  })

  return (
    <div className={cn('flex flex-col bg-card', className)}>
      <div className="p-4 border-b space-y-3">
        <h2 className="font-semibold">Mensagens</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar paciente..."
            className="pl-9 bg-muted/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 xl:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs flex-1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="triagem_ia">Triagem IA</SelectItem>
              <SelectItem value="aguardando_humano">Aguardando</SelectItem>
              <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
              <SelectItem value="finalizada">Finalizada</SelectItem>
            </SelectContent>
          </Select>
          {canSeeTenants && (
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger className="h-8 text-xs flex-1">
                <SelectValue placeholder="Unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Unidades</SelectItem>
                {tenants.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2 gap-1">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-3 p-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-sm text-destructive mb-2">{error}</p>
              <Button size="sm" onClick={loadData}>
                Tentar novamente
              </Button>
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground h-full min-h-[200px]">
              <MessageSquareOff className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">
                Nenhuma conversa.
                <br />
                Aguarde novos pacientes.
              </p>
            </div>
          ) : (
            conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={cn(
                  'flex flex-col items-start gap-2 p-3 rounded-lg text-left transition-all hover:bg-muted/50 border border-transparent',
                  chat.id === activeChatId && 'bg-muted border-border shadow-sm',
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium truncate text-sm flex items-center gap-1.5">
                    {chat.status === 'triagem_ia' && (
                      <Bot className="h-4 w-4 text-primary shrink-0" />
                    )}
                    <span className="truncate">{chat.patient_name || 'Paciente Desconhecido'}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {new Date(chat.updated).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <span className="text-xs text-muted-foreground truncate">
                    {chat.patient_whatsapp}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[9px] px-1.5 h-4 capitalize shrink-0 ml-2 whitespace-nowrap',
                      chat.status === 'aguardando_humano' &&
                        'bg-amber-100 text-amber-800 border-amber-200',
                      chat.status === 'em_atendimento' &&
                        'bg-green-100 text-green-800 border-green-200',
                      chat.status === 'finalizada' && 'bg-gray-100 text-gray-800 border-gray-200',
                      chat.status === 'triagem_ia' && 'bg-blue-100 text-blue-800 border-blue-200',
                    )}
                  >
                    {chat.status.replace('_', ' ')}
                  </Badge>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
