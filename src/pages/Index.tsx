import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, Micropscope, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import logoUrl from '@/assets/logo-02-4a0a7.png'

export default function Index() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      navigate('/inbox')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background animate-fade-in">
      {/* Left Branding Panel */}
      <div className="md:w-[55%] relative flex flex-col justify-center p-8 md:p-16 overflow-hidden">
        {/* Background with Brand Colors Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#17417a] to-secondary opacity-95"></div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-secondary/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col max-w-xl mx-auto md:mx-0 animate-slide-up">
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl mb-12 inline-flex items-center justify-center w-fit border border-white/20">
            <img
              src={logoUrl}
              alt="São Lucas Centro de Diagnósticos"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight leading-tight">
            Gestão Inteligente de{' '}
            <span className="text-secondary-foreground border-b-4 border-secondary pb-1">
              Atendimento
            </span>
          </h1>

          <p className="text-primary-foreground/90 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
            Centralize as mensagens do WhatsApp e Instagram. Utilize nossa IA para agendar exames,
            tirar dúvidas e humanizar o contato com seus pacientes.
          </p>

          <div className="flex gap-4 text-primary-foreground/80 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4 text-secondary" /> Segurança de Dados
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Activity className="w-4 h-4 text-secondary" /> Resultados Rápidos
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="md:w-[45%] flex items-center justify-center p-6 md:p-12 bg-muted/30">
        <div className="w-full max-w-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="shadow-2xl border-0 ring-1 ring-border/50 bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader className="space-y-3 pb-8 pt-8 px-8">
              <CardTitle className="text-3xl font-bold text-primary tracking-tight">
                Acesso ao Painel
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Insira suas credenciais corporativas para acessar o sistema multicanal.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-semibold">
                    E-mail corporativo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="atendimento@saolucas.com.br"
                    required
                    className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-primary focus-visible:border-primary transition-all text-base"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground font-semibold">
                      Senha
                    </Label>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="h-12 bg-background border-muted-foreground/20 focus-visible:ring-primary focus-visible:border-primary transition-all text-base"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base h-12 mt-4 shadow-lg shadow-primary/20 transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Autenticando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center w-full">
                      Entrar no Sistema
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/40 border-t px-8 py-5 flex justify-center">
              <p className="text-sm text-muted-foreground">
                Precisa de ajuda?{' '}
                <a href="#" className="text-secondary font-semibold hover:underline">
                  Fale com o suporte de TI
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
