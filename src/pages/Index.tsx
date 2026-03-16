import KpiCards from './dashboard/KpiCards'
import ActivityChart from './dashboard/ActivityChart'
import ServiceChart from './dashboard/ServiceChart'
import AlertsList from './dashboard/AlertsList'
import LostReasonsChart from './dashboard/LostReasonsChart'
import SurveyResults from './dashboard/SurveyResults'

export default function Index() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Visão Geral
        </h1>
        <p className="text-muted-foreground">Bem-vindo ao painel omnichannel da Clínica.</p>
      </div>

      <KpiCards />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="lg:col-span-1">
          <ServiceChart />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <LostReasonsChart />
        </div>
        <div className="lg:col-span-1">
          <SurveyResults />
        </div>
        <div className="lg:col-span-1">
          <AlertsList />
        </div>
      </div>
    </div>
  )
}
