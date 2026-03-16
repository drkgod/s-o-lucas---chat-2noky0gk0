import { useState } from 'react'
import { Plus, Search, Stethoscope, TestTube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { mockServices } from '@/lib/mock'

export default function Services() {
  const [activeTab, setActiveTab] = useState('exam')
  const filteredServices = mockServices.filter((s) => s.category === activeTab)

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Catálogo de Serviços</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie os exames, testes e consultas que a IA pode oferecer.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Serviço
        </Button>
      </div>

      <div className="flex flex-col flex-1 bg-card rounded-xl border shadow-sm p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col flex-1"
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="exam" className="gap-2">
                <TestTube className="h-4 w-4" /> Exames Lab
              </TabsTrigger>
              <TabsTrigger value="test" className="gap-2">
                <Stethoscope className="h-4 w-4" /> Testes Especiais
              </TabsTrigger>
              <TabsTrigger value="consultation" className="gap-2">
                <UserIcon className="h-4 w-4" /> Consultas
              </TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar serviço..." className="pl-9" />
            </div>
          </div>

          <TabsContent value={activeTab} className="flex-1 mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[300px]">Nome do Serviço</TableHead>
                    <TableHead>Valor Base</TableHead>
                    <TableHead>Instruções / Preparo (Treinamento IA)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{service.price}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-md truncate">
                          {service.instructions}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        Nenhum serviço cadastrado nesta categoria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function UserIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
