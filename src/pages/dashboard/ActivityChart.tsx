import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { time: '06:00', whatsapp: 40, instagram: 12 },
  { time: '09:00', whatsapp: 120, instagram: 45 },
  { time: '12:00', whatsapp: 210, instagram: 80 },
  { time: '15:00', whatsapp: 180, instagram: 60 },
  { time: '18:00', whatsapp: 90, instagram: 30 },
  { time: '21:00', whatsapp: 50, instagram: 50 },
]

const chartConfig = {
  whatsapp: { label: 'WhatsApp', color: '#25D366' },
  instagram: { label: 'Instagram', color: '#E1306C' },
}

export default function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume de Mensagens (24h)</CardTitle>
        <CardDescription>Fluxo de interações separado por plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillWa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-whatsapp)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-whatsapp)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillIg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-instagram)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-instagram)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="whatsapp"
              stroke="var(--color-whatsapp)"
              fillOpacity={1}
              fill="url(#fillWa)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="instagram"
              stroke="var(--color-instagram)"
              fillOpacity={1}
              fill="url(#fillIg)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
