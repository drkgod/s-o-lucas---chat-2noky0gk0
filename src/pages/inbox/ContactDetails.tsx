import { useState, useEffect } from 'react'
import { FileText, User, Download, FileJson } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { getDocuments } from '@/services/inbox'
import pb from '@/lib/pocketbase/client'

export default function ContactDetails({ className }: { className?: string }) {
  const { activeChatId } = useAppStore()
  const [documents, setDocuments] = useState<any[]>([])
  const [conversation, setConversation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)

  const loadData = async () => {
    if (!activeChatId) return
    try {
      setLoading(true)
      const [docsRes, convRes] = await Promise.all([
        getDocuments(activeChatId),
        pb.collection('conversations').getOne(activeChatId),
      ])
      setDocuments(docsRes)
      setConversation(convRes)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [activeChatId])

  if (!activeChatId) {
    return <div className={cn('bg-slate-50', className)} />
  }

  return (
    <div className={cn('flex flex-col bg-white overflow-hidden', className)}>
      <div className="p-4 border-b border-slate-200 shrink-0">
        <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
          <User className="h-5 w-5 text-slate-500" /> Detalhes do Paciente
        </h3>
      </div>

      <ScrollArea className="flex-1 bg-slate-50">
        <div className="p-6 flex flex-col gap-6">
          {loading ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-[120px] w-full rounded-lg" />
              <Skeleton className="h-[120px] w-full rounded-lg" />
            </div>
          ) : (
            <>
              {/* Patient Info Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px] uppercase font-bold tracking-wider mb-1">
                    Nome
                  </span>
                  <span className="text-[14px] font-medium text-slate-900">
                    {conversation?.patient_name || '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px] uppercase font-bold tracking-wider mb-1">
                    WhatsApp
                  </span>
                  <span className="text-[14px] font-medium text-slate-900">
                    {conversation?.patient_whatsapp || '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px] uppercase font-bold tracking-wider mb-1">
                    CPF
                  </span>
                  <span className="text-[14px] font-medium text-slate-900">
                    {conversation?.patient_cpf || '-'}
                  </span>
                </div>
              </div>

              {/* Documents Section */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[12px] font-bold uppercase text-slate-500 flex items-center gap-2 tracking-wider">
                  <FileText className="h-4 w-4" /> Documentos e OCR
                </h4>

                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-slate-500 bg-white border border-slate-200 border-dashed rounded-lg shadow-sm">
                    <FileJson className="w-6 h-6 mb-3 opacity-50" />
                    <p className="text-[14px] text-center font-medium">Nenhum documento anexado.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => {
                      const isProcessed = doc.ocr_status === 'Processado'
                      const isPending = doc.ocr_status === 'Pendente'
                      const isFailed = doc.ocr_status === 'Falha'

                      return (
                        <div
                          key={doc.id}
                          className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                        >
                          <button
                            className="p-4 flex items-start justify-between cursor-pointer hover:bg-slate-50 transition-colors w-full text-left outline-none"
                            onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                            aria-expanded={expandedDoc === doc.id}
                            aria-label={`Ver detalhes do documento ${doc.type}`}
                          >
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[14px] font-bold text-slate-900">
                                {doc.type}
                              </span>
                              <span className="text-[12px] font-medium text-slate-500">
                                {new Date(doc.created).toLocaleDateString()} às{' '}
                                {new Date(doc.created).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-[12px] px-2 py-0.5 h-6 font-bold shadow-none border',
                                isProcessed && 'border-green-200 text-green-800 bg-green-50',
                                isPending && 'border-yellow-200 text-yellow-800 bg-yellow-50',
                                isFailed && 'border-red-200 text-red-800 bg-red-50',
                              )}
                            >
                              {doc.ocr_status}
                            </Badge>
                          </button>

                          {expandedDoc === doc.id && (
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                              {doc.ocr_data ? (
                                <div className="bg-slate-900 p-4 rounded-lg text-[12px] font-mono overflow-x-auto text-emerald-400 shadow-inner">
                                  <pre>{JSON.stringify(doc.ocr_data, null, 2)}</pre>
                                </div>
                              ) : (
                                <div className="bg-white p-3 rounded-lg text-[14px] font-medium text-slate-500 text-center border border-slate-200">
                                  Sem dados OCR extraídos.
                                </div>
                              )}

                              {doc.file && (
                                <Button
                                  variant="outline"
                                  className="w-full text-[14px] font-bold h-[44px] rounded-lg hover:shadow-md transition-shadow bg-white text-slate-700 hover:text-slate-900"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(pb.files.getUrl(doc, doc.file), '_blank')
                                  }}
                                  aria-label="Baixar arquivo original"
                                >
                                  <Download className="w-4 h-4 mr-2" /> Baixar Original
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
