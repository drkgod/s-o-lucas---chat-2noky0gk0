import { Link, useLocation } from 'react-router-dom'
import { MessageSquare, Settings, Users, Activity, FileText, HelpCircle } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import logoUrl from '@/assets/logo-02-4a0a7.png'

const menuItems = [
  { title: 'Atendimentos', url: '/inbox', icon: MessageSquare },
  { title: 'Pacientes', url: '/pacientes', icon: Users },
  { title: 'Exames', url: '/exames', icon: Activity },
  { title: 'Relatórios', url: '/relatorios', icon: FileText },
  { title: 'Configuração', url: '/configuracao', icon: Settings },
]

export default function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border/50 bg-card">
      <SidebarHeader className="border-b border-border/50 p-4 min-h-[4rem] flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center justify-center w-full transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src={logoUrl}
            alt="São Lucas Centro de Diagnósticos"
            className="h-10 w-auto object-contain"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium text-xs uppercase tracking-wider mb-2 px-4">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary hover:bg-primary/15'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                        <span
                          className={`font-medium ${isActive ? 'text-primary font-semibold' : ''}`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <a href="#" className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">Ajuda e Suporte</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
