import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const data = [
  { name: 'Exames de Sangue', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Consultas Médicas', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Ecocardiograma', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Outros Testes', value: 100, fill: 'hsl(var(--chart-4))' },
]

const chartConfig = {
  exames: { label: 'Exames de Sangue', color: 'hsl(var(--chart-1))' },
  consultas: { label: 'Consultas', color: 'hsl(var(--chart-2))' },
  eco: { label: 'Ecocardiograma', color: 'hsl(var(--chart-3))' },
  outros: { label: 'Outros', color: 'hsl(var(--chart-4))' },
}

export default function ServiceChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Solicitações</CardTitle>
        <CardDescription>Principais intenções identificadas pela IA</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
