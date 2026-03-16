import { Link, useLocation } from 'react-router-dom'
import { Activity, MessageSquare, Settings, BookOpen, Stethoscope } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function AppSidebar() {
  const location = useLocation()
  const { hasAlert } = useAppStore()

  const navItems = [
    { title: 'Dashboard', url: '/', icon: Activity },
    { title: 'Inbox Central', url: '/inbox', icon: MessageSquare, alert: hasAlert },
    { title: 'Catálogo de Serviços', url: '/servicos', icon: Stethoscope },
    { title: 'Treinamento IA', url: '/configuracao', icon: BookOpen },
  ]

  return (
    <Sidebar variant="sidebar" className="border-r border-border">
      <SidebarHeader className="flex h-16 items-center justify-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight truncate">Clínica IA</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon
                        className={cn('h-4 w-4', item.alert && 'text-destructive animate-pulse')}
                      />
                      <span>{item.title}</span>
                      {item.alert && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-destructive animate-pulse-ring" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Ajustes do Sistema">
                  <a href="#" className="flex items-center gap-3 text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    <span>Ajustes do Sistema</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
