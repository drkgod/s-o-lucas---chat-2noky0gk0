import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Save, Bot, MessageSquare, Shield, Smartphone, Clock, Settings2 } from 'lucide-react'

export default function Configuration() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Configurações do Sistema
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Gerencie as preferências da IA, integrações e diretrizes do laboratório.
          </p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90 text-white gap-2 shadow-sm shrink-0">
          <Save className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="ia" className="w-full space-y-6">
        <TabsList className="bg-muted/50 p-1 w-full justify-start overflow-x-auto h-auto">
          <TabsTrigger
            value="ia"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 px-4 rounded-md text-sm font-medium transition-all"
          >
            <Bot className="w-4 h-4 mr-2" />
            Assistente de IA
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 px-4 rounded-md text-sm font-medium transition-all"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Canais de Atendimento
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 px-4 rounded-md text-sm font-medium transition-all"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Preferências da Clínica
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 px-4 rounded-md text-sm font-medium transition-all"
          >
            <Shield className="w-4 h-4 mr-2" />
            Segurança & LGPD
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ia" className="space-y-6 animate-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-muted/10">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Diretrizes da Inteligência Artificial
                </CardTitle>
                <CardDescription>
                  Configure a personalidade e o conhecimento base da IA para o São Lucas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <Label htmlFor="prompt" className="text-base font-semibold">
                    Prompt Principal (Personalidade)
                  </Label>
                  <Textarea
                    id="prompt"
                    className="min-h-[160px] resize-y bg-background focus-visible:ring-primary text-base leading-relaxed"
                    defaultValue="Você é um assistente virtual do São Lucas Centro de Diagnósticos. Sua função é atender pacientes com cordialidade, tirar dúvidas sobre preparos de exames, informar valores e realizar agendamentos. Utilize um tom acolhedor, empático e sempre claro."
                  />
                  <p className="text-sm text-muted-foreground">
                    Esta instrução define como a IA se apresenta e interage com os pacientes.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h3 className="font-semibold text-foreground">Habilidades Ativas</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
                      <Switch
                        id="auto-schedule"
                        defaultChecked
                        className="data-[state=checked]:bg-secondary mt-0.5"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="auto-schedule" className="font-medium cursor-pointer">
                          Agendamento Automático
                        </Label>
                        <p className="text-sm text-muted-foreground leading-snug">
                          Permitir que a IA insira horários diretamente na agenda do sistema.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
                      <Switch
                        id="auto-results"
                        defaultChecked
                        className="data-[state=checked]:bg-secondary mt-0.5"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="auto-results" className="font-medium cursor-pointer">
                          Envio de Resultados
                        </Label>
                        <p className="text-sm text-muted-foreground leading-snug">
                          A IA pode buscar e enviar laudos em PDF mediante autenticação do paciente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-muted/10 pb-4">
                  <CardTitle className="text-base">Métricas da IA</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Taxa de Resolução</span>
                    <span className="font-bold text-secondary">87%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Tempo Médio Rsp.</span>
                    <span className="font-bold text-foreground">1.2s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transferências Humano</span>
                    <span className="font-bold text-foreground">13%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Canais Integrados
              </CardTitle>
              <CardDescription>Gerencie as conexões ativas do laboratório.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
                O módulo de gestão de canais está em configuração.
                <br />
                Em breve você poderá gerenciar múltiplas linhas de WhatsApp aqui.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horário de Atendimento
              </CardTitle>
              <CardDescription>
                Configure os horários de funcionamento para a IA informar aos pacientes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
                Painel de horários e unidades do São Lucas.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-sm border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                Privacidade e LGPD
              </CardTitle>
              <CardDescription>
                Configurações de retenção e anonimização de dados de saúde.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-foreground">
                    Anonimização de Laudos na IA
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ocultar dados sensíveis nos logs de conversação da Inteligência Artificial.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-secondary" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
