import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'
import Header from './Header'
import StatusBar from './StatusBar'
import { useToast } from '@/hooks/use-toast'
import useAppStore from '@/stores/useAppStore'

export default function Layout() {
  const { toast } = useToast()
  const { setHasAlert } = useAppStore()

  useEffect(() => {
    // Simulate incoming critical alert for demo purposes
    const timer = setTimeout(() => {
      setHasAlert(true)
      toast({
        title: 'Intervenção Humana Solicitada',
        description: 'Paciente Maria Silva precisa de assistência na Linha Principal.',
        variant: 'destructive',
      })
    }, 4000)
    return () => clearTimeout(timer)
  }, [setHasAlert, toast])

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto animate-fade-in p-4 md:p-6 lg:p-8">
            <div className="mx-auto h-full max-w-7xl">
              <Outlet />
            </div>
          </main>
          <StatusBar />
        </div>
      </div>
    </SidebarProvider>
  )
}
