import React from 'react'

export const SCENARIOS = {
  default: {
    name: 'Maria Júlia Pereira',
    phone: '+55 (11) 98765-4321',
    verified: true,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=15',
    initials: 'MJ',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Bom dia! Gostaria de saber se vocês realizam o exame de Hemograma Completo e qual o valor? Também preciso de instruções de jejum.',
        time: '09:15',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: (
          <>
            Bom dia, Maria Júlia! Aqui é o assistente virtual do{' '}
            <strong>São Lucas Centro de Diagnósticos</strong>. 💙
            <br />
            <br />
            Sim, realizamos o Hemograma Completo em todas as nossas unidades!
            <br />
            <br />🔹 <strong>Valor Particular:</strong> R$ 25,00
            <br />🔹 <strong>Prazo:</strong> Resultado no mesmo dia!
            <br />🔹 <strong>Preparo (Jejum):</strong> Opcional, mas recomenda-se não ingerir
            alimentos muito gordurosos no dia anterior.
            <br />
            <br />
            Gostaria de realizar o agendamento ou verificar a cobertura pelo seu plano de saúde?
          </>
        ),
        time: '09:16',
      },
      {
        id: 'm3',
        sender: 'action',
        actions: ['Ver Convênios Aceitos', 'Agendar Exame'],
      },
    ],
  },
  scenario1: {
    name: 'Carlos',
    phone: '+55 (11) 98765-1111',
    verified: false,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    initials: 'CA',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Bom dia, preciso de informações sobre o exame de espermograma. Como funciona?',
        time: '10:00',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: (
          <>
            Bom dia, Carlos! Aqui é o assistente virtual do{' '}
            <strong>São Lucas Centro de Diagnósticos</strong>, sob responsabilidade técnica do Dr.
            Rafael Toledo, membro da Sociedade Brasileira de Reprodução Assistida (SBRA) com mais de
            20 anos de experiência. 💙
            <br />
            <br />
            Para o espermograma, é necessário um período de abstinência sexual de 2 a 7 dias.
            <br />
            <br />
            Preparei um material exclusivo para você:
            <br />📘 <strong>E-book: Mapa da Fertilidade Masculina</strong>
            <br />
            <a href="#" className="text-secondary font-medium hover:underline">
              Baixar E-book
            </a>
            <br />
            <br />
            Gostaria de agendar o seu exame?
          </>
        ),
        time: '10:01',
      },
    ],
  },
  scenario2: {
    name: 'Luciana',
    phone: '+55 (11) 98765-2222',
    verified: false,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
    initials: 'LU',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Quais os cuidados para fazer o preventivo? Posso ir amanhã?',
        time: '11:30',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: (
          <>
            Olá, Luciana! Aqui é o assistente virtual do{' '}
            <strong>São Lucas Centro de Diagnósticos</strong>.
            <br />
            <br />
            Para o exame preventivo (Papanicolau), o ideal é realizar preferencialmente entre o 14º
            e 15º dia do ciclo menstrual. Além disso, é necessário aguardar 48h sem relações sexuais
            e não utilizar cremes ou duchas vaginais nesse período.
            <br />
            <br />
            Nosso diretor técnico, Dr. Rafael Toledo, é Delegado Regional da SBCC (Sociedade
            Brasileira de Citologia Clínica) e preparou um material especial para você:
            <br />📘 <strong>E-book: O Seu Preventivo Descomplicado</strong>
            <br />
            <a href="#" className="text-secondary font-medium hover:underline">
              Baixar E-book
            </a>
            <br />
            <br />
            Podemos verificar a melhor data para o seu agendamento?
          </>
        ),
        time: '11:31',
      },
    ],
  },
  scenario3: {
    name: 'Ricardo',
    phone: '+55 (11) 98765-3333',
    verified: false,
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    initials: 'RI',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Estou em dúvida se faço meus exames aí ou em outro laboratório. O resultado é seguro mesmo?',
        time: '14:20',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: (
          <>
            Compreendo sua preocupação, Ricardo. A segurança dos seus resultados é nossa prioridade!
            <br />
            <br />O <strong>São Lucas Centro de Diagnósticos</strong> possui a classificação 'Padrão
            Ouro' pelo PNCQ (Programa Nacional de Controle de Qualidade). Nosso responsável técnico,
            Dr. Rafael Toledo, é membro da SBAC (Sociedade Brasileira de Análises Clínicas) e atua
            há mais de 20 anos garantindo excelência em diagnósticos.
            <br />
            <br />
            Você pode conferir mais sobre nosso trabalho e dicas de saúde no Instagram do Dr.
            Rafael:
            <br />👉{' '}
            <a href="#" className="text-secondary font-medium hover:underline">
              @rafaeltoledo.laboratorio
            </a>
            <br />
            <br />
            Gostaria de agendar seus exames com a tranquilidade que você merece?
          </>
        ),
        time: '14:21',
      },
    ],
  },
}

export type ScenarioId = keyof typeof SCENARIOS
