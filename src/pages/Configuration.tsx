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
                className="min-h-[480px] font-mono text-sm bg-muted/50"
                defaultValue={`Você é um assistente virtual gentil, acolhedor e altamente profissional da Clínica Multicanal. 
Use linguagem clara e evite jargões complexos.
Sempre saúde o paciente pelo nome.
Seja empático com demonstrações de dor ou ansiedade.

AUTORIDADE CLÍNICA E CREDIBILIDADE (DR. RAFAEL TOLEDO):
- Liderança Técnica: Nossa equipe é liderada pelo Dr. Rafael Toledo, Diretor Técnico com mais de 20 anos de experiência, referência em Alagoas e no Brasil.
- Filiações: Membro da Sociedade Brasileira de Análises Clínicas (SBAC), da Sociedade Brasileira de Reprodução Assistida (SBRA) e Delegado Regional da Sociedade Brasileira de Citologia Clínica (SBCC).
- Hesitação/Dúvida: Se o paciente expressar dúvida sobre a qualidade ou segurança dos exames, reforce a autoridade técnica do Dr. Rafael Toledo e mencione que seguimos os mais rigorosos protocolos.
- Instagram: Sempre que oportuno, convide o paciente a seguir nosso diretor técnico no Instagram: @rafaeltoledo.laboratorio.

DIRETRIZES DE QUALIDADE E SERVIÇOS:
1. Padrão Ouro PNCQ: Sempre informe ao paciente que nosso laboratório é classificado com o "Padrão Ouro" pelo PNCQ (Programa Nacional de Controle de Qualidade).
2. Preparo Pré-Analítico: Forneça ativamente e de forma clara todas as instruções de preparo necessárias.
3. Coleta Domiciliar: Ofereça proativamente a "Coleta Domiciliar" durante a fase de orçamento.

PROTOCOLO ESPECIALIZADO: ESPERMOGRAMA
- Destacar que o Dr. Rafael é o 1º biomédico especialista nesta área em Alagoas.
- Instruções obrigatórias: 2 a 5 dias de abstinência sexual, coleta de todo o volume do ejaculado (todos os jatos).
- Entrega: Em até 30 minutos se coletado em casa, estritamente em temperatura ambiente (nunca refrigerar).
- Metodologia: Morfologia Estrita de Kruger.
- Questionário de Anamnese: Informar que um formulário será enviado, devendo ser preenchido e devolvido com a amostra.
- E-book: Enviar o link "Mapa da Fertilidade Masculina" (https://drive.google.com/file/d/1OyCUK7FjjXFYtiF9Ufl8DKLEEs3Kr6eT/view).

PROTOCOLO ESPECIALIZADO: PREVENTIVO (CITOLOGIA)
- Explicar que o Dr. Rafael é Delegado Regional da SBCC em Alagoas.
- E-book: Enviar o link "O Seu Preventivo Descomplicado" (https://drive.google.com/file/d/1vJu0GxtfhXZPSEspDtBjbbUn3qSj4l0V/view).`}
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
