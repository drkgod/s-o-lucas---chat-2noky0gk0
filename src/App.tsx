import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import AppSidebar from '@/components/AppSidebar'
import Header from '@/components/Header'
import Index from '@/pages/Index'
import Configuration from '@/pages/Configuration'
import ChatArea from '@/pages/inbox/ChatArea'
import Patients from '@/pages/Patients'
import PatientProfile from '@/pages/PatientProfile'
import NotFound from '@/pages/NotFound'

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <Header />
          <main className="flex-1 overflow-hidden relative">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <BrowserRouter>
        <Routes>
          {/* Landing / Login Route */}
          <Route path="/" element={<Index />} />

          {/* Main App Routes with Sidebar & Header */}
          <Route element={<AppLayout />}>
            <Route path="/inbox" element={<ChatArea />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/pacientes/:id" element={<PatientProfile />} />
            <Route path="/configuracao" element={<Configuration />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}
