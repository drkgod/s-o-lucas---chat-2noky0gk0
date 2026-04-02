import { useState } from 'react'
import { Search, MoreHorizontal, Eye, FileText, UserPlus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const mockPatients = [
  {
    id: 'p1',
    name: 'Ana Souza',
    contact: '(11) 98765-4321',
    lastExam: 'Hemograma Completo',
    date: '12/10/2023',
    status: 'Concluído',
  },
  {
    id: 'p2',
    name: 'Carlos Mendes',
    contact: '(11) 91234-5678',
    lastExam: 'Espermograma',
    date: '15/01/2024',
    status: 'Ativo',
  },
  {
    id: 'p3',
    name: 'Mariana Silva',
    contact: '(11) 99988-7766',
    lastExam: 'Preventivo',
    date: '20/02/2024',
    status: 'Pendente',
  },
  {
    id: 'p4',
    name: 'João Pedro',
    contact: '(11) 97777-6666',
    lastExam: 'Exame Toxicológico',
    date: '15/02/2024',
    status: 'Concluído',
  },
  {
    id: 'p5',
    name: 'Lucia Fernandes',
    contact: '(11) 94444-3333',
    lastExam: 'Citologia',
    date: '10/03/2024',
    status: 'Pendente',
  },
  {
    id: 'p6',
    name: 'Roberto Alves',
    contact: '(11) 95555-2222',
    lastExam: 'Eletrocardiograma',
    date: '05/01/2024',
    status: 'Ativo',
  },
]

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Concluído':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/20 shadow-none">
            Concluído
          </Badge>
        )
      case 'Ativo':
        return (
          <Badge className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-500/20 shadow-none">
            Ativo
          </Badge>
        )
      case 'Pendente':
        return (
          <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-500/20 shadow-none">
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pacientes</h1>
          <p className="text-base text-slate-500 mt-1">
            Gerencie os pacientes cadastrados e acompanhe seus exames.
          </p>
        </div>
        <div className="w-full sm:w-auto flex items-center gap-3">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden transition-all duration-200">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome ou contato..."
              className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700 h-11">Nome</TableHead>
                <TableHead className="font-semibold text-slate-700 h-11">Contato</TableHead>
                <TableHead className="font-semibold text-slate-700 h-11">Último Exame</TableHead>
                <TableHead className="font-semibold text-slate-700 h-11">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 h-11 pr-6">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="hover:bg-slate-50/80 transition-colors border-slate-100 group"
                  >
                    <TableCell className="font-medium text-slate-900 py-3">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-slate-600 py-3">{patient.contact}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-slate-700">
                          {patient.lastExam}
                        </span>
                        <span className="text-xs text-slate-500">{patient.date}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">{getStatusBadge(patient.status)}</TableCell>
                    <TableCell className="text-right py-3 pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-slate-300"
                          >
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[180px] border-slate-200 shadow-elevation"
                        >
                          <DropdownMenuLabel className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                            Ações
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem className="cursor-pointer text-slate-700 focus:text-slate-900 focus:bg-slate-50">
                            <Eye className="mr-2 h-4 w-4 text-slate-400" />
                            <span>Ver Detalhes</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-slate-700 focus:text-slate-900 focus:bg-slate-50">
                            <FileText className="mr-2 h-4 w-4 text-slate-400" />
                            <span>Histórico Médico</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-8 w-8 text-slate-300 mb-2" />
                      <p>Nenhum paciente encontrado para "{searchTerm}".</p>
                      <Button
                        variant="link"
                        onClick={() => setSearchTerm('')}
                        className="text-blue-600 p-0 h-auto"
                      >
                        Limpar busca
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
