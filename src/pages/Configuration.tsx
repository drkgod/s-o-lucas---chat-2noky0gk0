import { Bot, Save, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'

export default function Configuration() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: 'Configurações Salvas',
      description: 'A base de conhecimento da IA foi atualizada com sucesso.',
    })
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Treinamento e IA</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure o comportamento, a personalidade e o conhecimento base da inteligência
          artificial.
        </p>
      </div>

      <Alert>
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Importante sobre a Resposta Médica</AlertTitle>
        <AlertDescription>
          A IA está programada com regras rígidas para não fornecer diagnósticos médicos. Todo o
          conhecimento abaixo é utilizado estritamente para agendamentos, preparos de exames e
          triagem inicial.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" /> Status Global da IA
                </CardTitle>
                <CardDescription>
                  Ativar ou desativar as respostas automáticas em todos os canais.
                </CardDescription>
              </div>
              <Switch defaultChecked />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalidade e Tom de Voz</CardTitle>
            <CardDescription>
              Como a IA deve se comportar ao interagir com os pacientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Prompt de Personalidade (System Prompt)</Label>
              <Textarea
                className="min-h-[150px] font-mono text-sm bg-muted/50"
                defaultValue={`Você é um assistente virtual gentil, acolhedor e altamente profissional da Clínica Multicanal. 
Use linguagem clara e evite jargões complexos.
Sempre saúde o paciente pelo nome.
Seja empático com demonstrações de dor ou ansiedade.`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regras de Negócio e Restrições</CardTitle>
            <CardDescription>Instruções específicas para o fluxo de atendimento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Regras de Handover (Transferência para Humano)</Label>
              <Textarea
                className="min-h-[120px] font-mono text-sm bg-muted/50"
                defaultValue={`- Transfira imediatamente se a palavra "emergência" ou "urgente" for detectada.
- Se não entender a solicitação após 2 tentativas, transfira.
- Para resultados de biópsias sensíveis, transfira para a central médica.`}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-6">
            <Button onClick={handleSave} className="ml-auto">
              <Save className="h-4 w-4 mr-2" /> Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
