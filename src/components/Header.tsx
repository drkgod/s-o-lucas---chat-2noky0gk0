import { Bell, Search, UserCircle, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'

export default function Header() {
  const { isMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4 sm:px-6 shadow-sm transition-colors duration-300">
      {/* Brand Accent Bar at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-secondary" />

      <SidebarTrigger className="-ml-2 text-primary hover:text-primary/80 hover:bg-primary/5" />

      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden sm:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Buscar pacientes, exames ou conversas..."
            className="w-full bg-muted/40 pl-9 rounded-full border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary border-2 border-background"></span>
          </span>
        </Button>
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
          <UserCircle className="h-6 w-6" />
        </div>
      </div>
    </header>
  )
}
