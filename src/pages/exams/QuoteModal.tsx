import { Printer, FileText, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { ExamItem } from '@/lib/types'

interface QuoteModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedExams: ExamItem[]
  patientName: string
  setPatientName: (name: string) => void
  onClear: () => void
}

export function QuoteModal({
  isOpen,
  onOpenChange,
  selectedExams,
  patientName,
  setPatientName,
  onClear,
}: QuoteModalProps) {
  const calculateTotal = (list: ExamItem[]) => {
    const total = list.reduce((acc, curr) => {
      const val = parseFloat(
        curr.price
          .replace(/[^\d,.-]/g, '')
          .replace('.', '')
          .replace(',', '.'),
      )
      return acc + (isNaN(val) ? 0 : val)
    }, 0)
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 z-40 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <span className="text-sm font-medium">
        <span className="bg-slate-700 text-white px-2.5 py-1 rounded-full text-xs mr-2">
          {selectedExams.length}
        </span>
        {selectedExams.length === 1 ? 'exame selecionado' : 'exames selecionados'}
      </span>

      <div className="h-4 w-px bg-slate-700" />

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-full"
          onClick={onClear}
        >
          Limpar
        </Button>

        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold px-6 shadow-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Gerar Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-slate-50">
            <div className="print:fixed print:inset-0 print:z-[9999] print:bg-white print:p-12 print:block overflow-y-auto max-h-[85vh] print:max-h-none">
              <div className="p-6 bg-white border-b print:border-none">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">São Lucas</h2>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                      Centro de Diagnósticos
                    </p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p>Orçamento de Exames</p>
                    <p>{new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg print:bg-transparent print:p-0 print:border-b print:pb-4 print:mb-6 mb-2">
                  <Label
                    htmlFor="patient-name"
                    className="text-slate-500 text-xs uppercase font-bold mb-1 block print:hidden"
                  >
                    Nome do Paciente (Opcional)
                  </Label>
                  <Input
                    id="patient-name"
                    placeholder="Digite o nome do paciente..."
                    className="print:hidden bg-white max-w-sm"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  <div className="hidden print:block text-lg font-medium">
                    Paciente:{' '}
                    <span className="font-bold">
                      {patientName || '_________________________________________'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Exames Selecionados
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 print:bg-transparent">
                        <TableHead className="font-semibold text-slate-900">Código</TableHead>
                        <TableHead className="font-semibold text-slate-900">Exame</TableHead>
                        <TableHead className="font-semibold text-slate-900">Categoria</TableHead>
                        <TableHead className="text-right font-semibold text-slate-900">
                          Valor
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedExams.map((exam) => (
                        <TableRow key={exam.id} className="print:border-b border-slate-100">
                          <TableCell className="font-mono text-xs text-slate-500">
                            {exam.code}
                          </TableCell>
                          <TableCell className="font-medium">{exam.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="print:border-slate-300 font-normal text-xs"
                            >
                              {exam.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{exam.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-end items-center text-xl font-bold mt-4 pt-4 border-t text-slate-900">
                    <span className="mr-4 text-sm font-medium text-slate-500 uppercase">
                      Total Estimado:
                    </span>
                    {calculateTotal(selectedExams)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2 border-b pb-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Instruções de Preparo
                  </h3>
                  <div className="grid gap-4">
                    {selectedExams.map((exam) => (
                      <div
                        key={`prep-${exam.id}`}
                        className="bg-slate-50 p-4 rounded-lg print:bg-transparent print:p-0 print:border print:border-slate-200 print:p-4 print:mb-2"
                      >
                        <p className="font-semibold text-slate-900 mb-1">{exam.name}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {exam.instructions ||
                            'Não há preparo específico obrigatório para este exame. Recomendamos apenas evitar alimentação pesada nas horas antecedentes.'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 mt-6 text-center print:text-left print:mt-12">
                    * Os valores informados são estimativas e podem sofrer alterações. Válido por 15
                    dias.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-between items-center print:hidden">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => window.print()}
                className="gap-2 bg-primary text-white hover:bg-primary/90"
              >
                <Printer className="w-4 h-4" />
                Imprimir / Salvar PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
