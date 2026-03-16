import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { reason: 'Preço', count: 45 },
  { reason: 'Forma Pagto', count: 25 },
  { reason: 'Disponib.', count: 15 },
  { reason: 'Concorrente', count: 30 },
  { reason: 'Outros', count: 10 },
]

const chartConfig = {
  count: { label: 'Ocorrências', color: 'hsl(var(--chart-1))' },
}

export default function LostReasonsChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Motivos de Recusa (IA)</CardTitle>
        <CardDescription>Objeções mapeadas no fluxo de recuperação</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
            <XAxis
              dataKey="reason"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={{ fill: 'var(--color-secondary)', opacity: 0.1 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
