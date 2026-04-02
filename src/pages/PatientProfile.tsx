import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  CreditCard,
  Activity,
  MessageSquare,
  AlertCircle,
} from 'lucide-react'
import { mockPatients } from '@/lib/mock'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PatientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultTab = searchParams.get('tab') === 'history' ? 'history' : 'profile'

  const patient = mockPatients.find((p) => p.id === id)

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8">
        <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-medium text-slate-700 mb-2">Paciente não encontrado</h2>
        <Button onClick={() => navigate('/pacientes')} variant="outline">
          Voltar para a lista
        </Button>
      </div>
    )
  }

  const exams = patient.exams || []
  const chats = patient.chats || []

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4 sm:p-6 lg:p-8 animate-fade-in overflow-y-auto">
      <Button
        variant="ghost"
        className="w-fit mb-6 -ml-4 text-slate-500 hover:text-slate-900 transition-colors"
        onClick={() => navigate('/pacientes')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Lista
      </Button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{patient.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
            <Badge variant="outline" className="bg-white font-medium text-slate-600">
              {patient.status}
            </Badge>
            <span className="bg-slate-200/50 px-2 py-0.5 rounded text-xs font-mono">
              ID: {patient.id}
            </span>
          </div>
        </div>
      </div>

      <Alert className="mb-8 border-blue-200 bg-blue-50/50 text-blue-800 shadow-sm">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <strong>Aviso de Persistência:</strong> Os dados exibidos nesta página e as atualizações
          realizadas são limitadas à sessão atual. Para salvamento permanente, conecte um banco de
          dados (ex: Supabase).
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={defaultTab} className="flex-1 flex flex-col">
        <TabsList className="w-full sm:w-auto self-start bg-slate-200/60 mb-6 p-1 rounded-lg">
          <TabsTrigger
            value="profile"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
          >
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
          >
            <Activity className="h-4 w-4 mr-2" />
            Histórico de Exames
          </TabsTrigger>
          <TabsTrigger
            value="chats"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Conversas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="flex-1 mt-0 outline-none">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Dados Cadastrais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" /> Nome Completo
                </p>
                <p className="font-medium text-slate-900">{patient.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-slate-400" /> CPF / RG
                </p>
                <p className="font-medium text-slate-900">{patient.cpf || 'Não informado'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" /> Telefone
                </p>
                <p className="font-medium text-slate-900">{patient.contact}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" /> E-mail
                </p>
                <p className="font-medium text-slate-900">{patient.email || 'Não informado'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="flex-1 mt-0 outline-none">
          <Card className="shadow-sm border-slate-200 overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Exames Anteriores
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                    <TableHead>Data</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Resultado</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.length > 0 ? (
                    exams.map((exam) => (
                      <TableRow key={exam.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-600">{exam.date}</TableCell>
                        <TableCell className="font-medium text-slate-900">{exam.name}</TableCell>
                        <TableCell className="text-slate-600">{exam.result}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              exam.status === 'Concluído'
                                ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                                : exam.status === 'Pendente'
                                  ? 'border-amber-200 text-amber-700 bg-amber-50'
                                  : 'border-blue-200 text-blue-700 bg-blue-50'
                            }
                          >
                            {exam.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                        Nenhum exame registrado para este paciente.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="flex-1 mt-0 outline-none">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-semibold text-slate-800">
                Histórico de Conversas
              </CardTitle>
            </CardHeader>
            <div className="divide-y divide-slate-100">
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{chat.date}</span>
                        <Badge variant="secondary" className="text-xs">
                          {chat.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mt-1">{chat.summary}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Ver Transcrição completa
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                  Nenhuma conversa registrada com a IA.
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
