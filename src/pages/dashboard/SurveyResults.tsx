import { Cell, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { name: '5 Estrelas', value: 120, fill: '#22c55e' },
  { name: '4 Estrelas', value: 45, fill: '#84cc16' },
  { name: '3 Estrelas', value: 15, fill: '#eab308' },
  { name: '1-2 Estrelas', value: 5, fill: '#ef4444' },
]

const chartConfig = {
  value: { label: 'Avaliações' },
}

export default function SurveyResults() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle>Pesquisa de Satisfação</CardTitle>
        <CardDescription>Avaliações CSAT pós-atendimento</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={80}
              strokeWidth={2}
            >
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
