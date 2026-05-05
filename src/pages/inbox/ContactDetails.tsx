import { useState, useEffect } from 'react'
import { FileText, User, Download, FileJson } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    return <div className={cn('bg-muted/30', className)} />
  }

  return (
    <div className={cn('flex flex-col bg-card overflow-hidden', className)}>
      <div className="p-4 border-b shrink-0">
        <h3 className="font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" /> Detalhes do Paciente
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 flex flex-col gap-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 text-sm bg-muted/30 p-3 rounded-lg border border-border/50">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                      Nome
                    </span>
                    <span className="font-medium text-foreground">
                      {conversation?.patient_name || '-'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                      WhatsApp
                    </span>
                    <span className="font-medium text-foreground">
                      {conversation?.patient_whatsapp || '-'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                      CPF
                    </span>
                    <span className="font-medium text-foreground">
                      {conversation?.patient_cpf || '-'}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex items-center gap-2 tracking-wider">
                  <FileText className="h-3 w-3" /> Documentos e OCR
                </h4>

                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
                    <FileJson className="w-6 h-6 mb-2 opacity-50" />
                    <p className="text-xs italic text-center">
                      Nenhum documento anexado a esta conversa.
                    </p>
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
                          className="border rounded-lg overflow-hidden flex flex-col shadow-sm"
                        >
                          <div
                            className="p-3 bg-muted/10 flex items-start justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold">{doc.type}</span>
                              <span className="text-[10px] text-muted-foreground">
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
                                'text-[10px] px-2 py-0 h-5 shadow-none',
                                isProcessed && 'border-green-200 text-green-700 bg-green-50',
                                isPending && 'border-yellow-200 text-yellow-700 bg-yellow-50',
                                isFailed && 'border-red-200 text-red-700 bg-red-50',
                              )}
                            >
                              {doc.ocr_status}
                            </Badge>
                          </div>

                          {expandedDoc === doc.id && (
                            <div className="p-3 border-t bg-background flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                              {doc.ocr_data ? (
                                <div className="bg-slate-900 p-3 rounded-md text-[11px] font-mono overflow-x-auto text-emerald-400">
                                  <pre>{JSON.stringify(doc.ocr_data, null, 2)}</pre>
                                </div>
                              ) : (
                                <div className="bg-muted p-2 rounded-md text-xs text-muted-foreground text-center">
                                  Sem dados OCR extraídos.
                                </div>
                              )}

                              {doc.file && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs h-8 hover:bg-primary/5 hover:text-primary"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(pb.files.getUrl(doc, doc.file), '_blank')
                                  }}
                                >
                                  <Download className="w-3 h-3 mr-2" /> Baixar arquivo original
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
