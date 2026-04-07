import { useState } from 'react'
import { Search, Upload, AlertCircle, FileSpreadsheet, Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { mockExams, mockImportedExams } from '@/lib/mock'
import { ExamItem } from '@/lib/types'

export default function Exams() {
  const [exams, setExams] = useState<ExamItem[]>(mockExams)
  const [searchQuery, setSearchQuery] = useState('')
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImport = () => {
    if (!selectedFile) return

    setIsImporting(true)

    // Simulate network/processing delay
    setTimeout(() => {
      setExams((prev) => [...prev, ...mockImportedExams])
      setIsImporting(false)
      setIsImportOpen(false)
      setSelectedFile(null)

      toast({
        title: 'Planilha importada com sucesso',
        description: `${mockImportedExams.length} novos exames foram adicionados à tabela.`,
      })
    }, 1500)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Laboratorial':
        return 'bg-blue-100 text-blue-800 border-transparent hover:bg-blue-200'
      case 'Imagem':
        return 'bg-purple-100 text-purple-800 border-transparent hover:bg-purple-200'
      case 'Cardiologia':
        return 'bg-rose-100 text-rose-800 border-transparent hover:bg-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-transparent hover:bg-slate-200'
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50 p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Exames e Valores</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie o catálogo de exames, códigos e tabela de preços da clínica.
          </p>
        </div>

        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Importar Planilha
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Importar Tabela de Exames</DialogTitle>
              <DialogDescription>
                Faça o upload de uma planilha (CSV ou Excel) contendo os exames, categorias e
                valores atualizados.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 border-slate-300 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedFile ? (
                      <>
                        <FileText className="w-8 h-8 mb-2 text-primary" />
                        <p className="text-sm text-slate-500 font-medium truncate max-w-[200px]">
                          {selectedFile.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-8 h-8 mb-2 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-500">
                          <span className="font-semibold">Clique para enviar</span> ou arraste o
                          arquivo
                        </p>
                        <p className="text-xs text-slate-500">XLSX, XLS ou CSV (MAX. 10MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsImportOpen(false)}
                disabled={isImporting}
              >
                Cancelar
              </Button>
              <Button onClick={handleImport} disabled={!selectedFile || isImporting}>
                {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Importar Dados
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Alert className="mb-6 bg-amber-50 text-amber-900 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Aviso de Persistência</AlertTitle>
        <AlertDescription className="text-amber-700/90">
          Como o banco de dados ainda não está conectado, os dados importados serão perdidos ao
          recarregar a página. Esta é apenas uma demonstração visual do fluxo de importação.
        </AlertDescription>
      </Alert>

      <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Buscar por nome ou código..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nome do Exame</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium text-slate-600">{exam.code}</TableCell>
                    <TableCell className="font-medium">{exam.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCategoryColor(exam.category)}>
                        {exam.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{exam.price}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                    Nenhum exame encontrado para "{searchQuery}"
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
