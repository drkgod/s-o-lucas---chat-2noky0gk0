import { Chat, ServiceItem } from './types'

export const mockChats: Chat[] = [
  {
    id: 'c1',
    contactName: 'Maria Silva',
    platform: 'whatsapp',
    lineName: 'Clínica Principal (55 11 9999-0001)',
    unreadCount: 2,
    status: 'pending_human',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    notes: 'Paciente diabética, requer horários matutinos.',
    history: ['Hemograma Completo (12/10/2023)', 'Consulta Cardiologia (05/01/2024)'],
    messages: [
      {
        id: 'm1',
        text: 'Olá, gostaria de saber o valor do ecocardiograma.',
        sender: 'user',
        timestamp: '10:30',
      },
      {
        id: 'm2',
        text: 'Olá! O valor do Ecocardiograma é R$ 250,00. Gostaria de agendar?',
        sender: 'ai',
        timestamp: '10:30',
      },
      {
        id: 'm3',
        text: 'Sim, mas preciso saber se o Dr. Roberto atende amanhã.',
        sender: 'user',
        timestamp: '10:32',
      },
      {
        id: 'm4',
        text: 'Não tenho acesso à agenda específica do Dr. Roberto no momento. Vou transferir você para um de nossos atendentes.',
        sender: 'ai',
        timestamp: '10:32',
      },
      { id: 'm5', text: 'Por favor, aguarde.', sender: 'user', timestamp: '10:35' },
    ],
  },
  {
    id: 'c2',
    contactName: 'João Pedro',
    platform: 'instagram',
    lineName: '@clinicamulticanal',
    unreadCount: 0,
    status: 'active',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    history: ['Exame Toxicológico (15/02/2024)'],
    messages: [
      {
        id: 'm1',
        text: 'Qual o preparo para exame de sangue comum?',
        sender: 'user',
        timestamp: '09:15',
      },
      {
        id: 'm2',
        text: 'Para o hemograma completo, recomendamos jejum de 8 a 12 horas. Você pode beber água moderadamente.',
        sender: 'ai',
        timestamp: '09:15',
      },
    ],
  },
  {
    id: 'c3',
    contactName: 'Ana Beatriz',
    platform: 'whatsapp',
    lineName: 'Agendamentos (55 11 9999-0002)',
    unreadCount: 0,
    status: 'resolved',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
    messages: [
      {
        id: 'm1',
        text: 'Marcado para amanhã às 8h. Obrigada!',
        sender: 'user',
        timestamp: 'Ontem',
      },
      {
        id: 'm2',
        text: 'A Clínica agradece! Lembre-se do jejum de 8 horas.',
        sender: 'ai',
        timestamp: 'Ontem',
      },
    ],
  },
]

export const mockServices: ServiceItem[] = [
  {
    id: 's1',
    category: 'exam',
    name: 'Hemograma Completo',
    price: 'R$ 45,00',
    instructions: 'Jejum de 8h a 12h. Água liberada.',
  },
  {
    id: 's2',
    category: 'exam',
    name: 'Glicemia em Jejum',
    price: 'R$ 20,00',
    instructions: 'Jejum absoluto de 8h.',
  },
  {
    id: 's3',
    category: 'test',
    name: 'Eletrocardiograma (ECG)',
    price: 'R$ 180,00',
    instructions: 'Não requer jejum. Evitar cremes no tórax.',
  },
  {
    id: 's4',
    category: 'test',
    name: 'Espirometria',
    price: 'R$ 150,00',
    instructions: 'Evitar café e cigarro 2h antes.',
  },
  {
    id: 's5',
    category: 'consultation',
    name: 'Cardiologia',
    price: 'R$ 300,00',
    instructions: 'Trazer exames anteriores.',
  },
]
