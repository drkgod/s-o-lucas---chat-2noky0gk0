import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChatList from './inbox/ChatList'
import ChatArea from './inbox/ChatArea'
import ContactDetails from './inbox/ContactDetails'
import { Button } from '@/components/ui/button'
import { PanelRightClose, PanelRightOpen, Loader2 } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAuth } from '@/hooks/use-auth'

export default function Inbox() {
  const { user, signIn, loading } = useAuth()
  const [showRightPanel, setShowRightPanel] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!user && !loading) {
      signIn('rafaelcamposbiomedico@gmail.com', 'Skip@Pass')
    }
  }, [user, loading, signIn])

  if (!user || loading) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-[14px] font-medium text-slate-600">Autenticando...</span>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-50 p-4">
        <Tabs defaultValue="list" className="w-full flex-1 flex flex-col gap-4">
          <TabsList className="w-full grid grid-cols-3 h-[44px] rounded-lg bg-slate-200">
            <TabsTrigger value="list" className="h-full rounded-md text-[14px] font-medium">
              Conversas
            </TabsTrigger>
            <TabsTrigger value="chat" className="h-full rounded-md text-[14px] font-medium">
              Chat
            </TabsTrigger>
            <TabsTrigger value="docs" className="h-full rounded-md text-[14px] font-medium">
              Detalhes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="flex-1 overflow-hidden m-0">
            <ChatList className="h-full w-full border border-slate-200 rounded-lg shadow-sm bg-white" />
          </TabsContent>
          <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
            <ChatArea className="h-full w-full border border-slate-200 rounded-lg shadow-sm bg-white" />
          </TabsContent>
          <TabsContent value="docs" className="flex-1 overflow-hidden m-0">
            <ContactDetails className="h-full w-full border border-slate-200 rounded-lg shadow-sm bg-white" />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold tracking-tight text-slate-900">Inbox Central</h1>
        <Button
          variant="outline"
          className="lg:hidden h-[44px] rounded-lg hover:shadow-sm"
          onClick={() => setShowRightPanel(!showRightPanel)}
          aria-label={showRightPanel ? 'Ocultar Detalhes' : 'Ver Detalhes'}
        >
          {showRightPanel ? (
            <PanelRightClose className="w-4 h-4 mr-2" />
          ) : (
            <PanelRightOpen className="w-4 h-4 mr-2" />
          )}
          {showRightPanel ? 'Ocultar Detalhes' : 'Ver Detalhes'}
        </Button>
      </div>
      <div className="flex flex-1 h-[calc(100vh-10rem)] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <ChatList className="w-[320px] border-r border-slate-200 shrink-0" />
        <ChatArea className="flex-1 min-w-0" />
        <div
          className={`shrink-0 border-l border-slate-200 transition-all duration-300 ease-in-out ${
            showRightPanel ? 'w-[320px]' : 'w-0 lg:w-[320px]'
          } overflow-hidden bg-slate-50`}
        >
          <ContactDetails className="w-[320px] h-full" />
        </div>
      </div>
    </div>
  )
}
