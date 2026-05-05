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
    <div className={cn('flex flex-col bg-slate-50/50', className)}>
      <div className="p-4 border-b border-slate-200 space-y-3 bg-white shrink-0">
        <h2 className="text-[16px] font-bold text-slate-900">Conversas</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar paciente..."
            className="pl-9 h-[44px] rounded-lg border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 bg-white text-[14px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar paciente"
          />
        </div>
        <div className="flex flex-col gap-3 xl:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="h-[44px] rounded-lg text-[14px] flex-1 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Filtrar por status"
            >
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
              <SelectTrigger
                className="h-[44px] rounded-lg text-[14px] flex-1 border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Filtrar por unidade"
              >
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

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-3">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-slate-100 shadow-sm animate-in fade-in"
                >
                  <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
          ) : error ? (
            <div className="p-4 text-center bg-white rounded-lg border border-slate-200 shadow-sm">
              <p className="text-[14px] text-red-600 mb-3 font-medium">{error}</p>
              <Button
                size="sm"
                onClick={loadData}
                className="h-[44px] rounded-lg px-6 hover:shadow-md transition-shadow font-medium"
              >
                Tentar novamente
              </Button>
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 h-full min-h-[200px] bg-white rounded-lg border border-slate-200 shadow-sm">
              <MessageSquareOff className="h-8 w-8 mb-3 opacity-50" />
              <p className="text-[14px] font-medium">
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
                aria-current={chat.id === activeChatId}
                className={cn(
                  'flex flex-col items-start gap-3 p-4 rounded-lg text-left transition-all bg-white border outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  chat.id === activeChatId
                    ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                    : 'border-slate-200 hover:shadow-md hover:border-slate-300',
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[16px] text-slate-900 truncate flex items-center gap-2">
                    {chat.status === 'triagem_ia' && (
                      <Bot className="h-4 w-4 text-blue-600 shrink-0" />
                    )}
                    <span className="truncate">{chat.patient_name || 'Paciente Desconhecido'}</span>
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 shrink-0">
                    {new Date(chat.updated).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[14px] text-slate-600 truncate font-medium">
                    {chat.patient_whatsapp}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[12px] px-2 py-0.5 h-6 font-bold capitalize shrink-0 ml-3 whitespace-nowrap border',
                      chat.status === 'aguardando_humano' &&
                        'bg-yellow-50 text-yellow-800 border-yellow-200',
                      chat.status === 'em_atendimento' &&
                        'bg-green-50 text-green-800 border-green-200',
                      chat.status === 'finalizada' && 'bg-slate-50 text-slate-800 border-slate-200',
                      chat.status === 'triagem_ia' && 'bg-blue-50 text-blue-800 border-blue-200',
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
