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
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Autenticando...</span>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-5rem)] gap-2 p-2">
        <Tabs defaultValue="list" className="w-full flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="list">Conversas</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="docs">Documentos</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="flex-1 overflow-hidden m-0 mt-2">
            <ChatList className="h-full w-full border rounded-xl" />
          </TabsContent>
          <TabsContent value="chat" className="flex-1 overflow-hidden m-0 mt-2">
            <ChatArea className="h-full w-full border rounded-xl" />
          </TabsContent>
          <TabsContent value="docs" className="flex-1 overflow-hidden m-0 mt-2">
            <ContactDetails className="h-full w-full border rounded-xl" />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inbox Central</h1>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setShowRightPanel(!showRightPanel)}
        >
          {showRightPanel ? (
            <PanelRightClose className="w-4 h-4 mr-2" />
          ) : (
            <PanelRightOpen className="w-4 h-4 mr-2" />
          )}
          {showRightPanel ? 'Ocultar Detalhes' : 'Ver Detalhes'}
        </Button>
      </div>
      <div className="flex flex-1 h-[calc(100vh-10rem)] w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <ChatList className="w-[300px] border-r shrink-0" />
        <ChatArea className="flex-1 min-w-0" />
        <div
          className={`shrink-0 border-l transition-all duration-300 ease-in-out ${showRightPanel ? 'w-[300px]' : 'w-0 lg:w-[300px]'} overflow-hidden bg-background`}
        >
          <ContactDetails className="w-[300px] h-full" />
        </div>
      </div>
    </div>
  )
}
