import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

export default function KpiCards() {
  const kpis = [
    {
      title: 'Total de Conversas (Hoje)',
      value: '1,248',
      description: '+12% comparado a ontem',
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      title: 'Taxa de Resolução IA',
      value: '84%',
      description: 'Intervenção humana reduzida',
      icon: CheckCircle,
      color: 'text-secondary',
    },
    {
      title: 'Aguardando Humano',
      value: '12',
      description: 'Requer atenção imediata',
      icon: AlertTriangle,
      color: 'text-destructive',
    },
    {
      title: 'Serviço Mais Solicitado',
      value: 'Ecocardiograma',
      description: '32% das consultas de hoje',
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="transition-all hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
