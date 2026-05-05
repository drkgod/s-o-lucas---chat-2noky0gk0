migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let adminId = ''
    try {
      const admin = app.findAuthRecordByEmail('_pb_users_auth_', 'rafaelcamposbiomedico@gmail.com')
      admin.set('role', 'admin')
      app.save(admin)
      adminId = admin.id
    } catch (_) {
      const record = new Record(users)
      record.setEmail('rafaelcamposbiomedico@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Rafael Toledo')
      record.set('role', 'admin')
      app.save(record)
      adminId = record.id
    }

    const tenantsCol = app.findCollectionByNameOrId('tenants')
    let tenantId = ''
    try {
      const t = app.findFirstRecordByData('tenants', 'name', 'São Lucas - Centro')
      tenantId = t.id
    } catch (_) {
      const t = new Record(tenantsCol)
      t.set('name', 'São Lucas - Centro')
      app.save(t)
      tenantId = t.id
    }

    const convsCol = app.findCollectionByNameOrId('conversations')
    let convId = ''
    try {
      const c = app.findFirstRecordByData('conversations', 'patient_whatsapp', '+5511999999999')
      convId = c.id
    } catch (_) {
      const c = new Record(convsCol)
      c.set('patient_name', 'João Silva')
      c.set('patient_whatsapp', '+5511999999999')
      c.set('patient_cpf', '123.456.789-00')
      c.set('status', 'triagem_ia')
      c.set('tenant', tenantId)
      app.save(c)
      convId = c.id

      const msgsCol = app.findCollectionByNameOrId('messages')
      const m1 = new Record(msgsCol)
      m1.set('conversation', convId)
      m1.set('author', 'paciente')
      m1.set('content', 'Olá, gostaria de saber os horários para exame.')
      m1.set('sender_name', 'João Silva')
      app.save(m1)

      const m2 = new Record(msgsCol)
      m2.set('conversation', convId)
      m2.set('author', 'ia')
      m2.set(
        'content',
        'Olá João! Sou o assistente virtual. Os horários de coleta são de segunda a sexta, das 6h às 10h. O que mais deseja saber?',
      )
      m2.set('sender_name', 'IA Assistente')
      app.save(m2)

      const m3 = new Record(msgsCol)
      m3.set('conversation', convId)
      m3.set('author', 'paciente')
      m3.set('content', 'Segue meu RG para adiantar.')
      m3.set('sender_name', 'João Silva')
      app.save(m3)

      const docsCol = app.findCollectionByNameOrId('documents')
      const d = new Record(docsCol)
      d.set('conversation', convId)
      d.set('type', 'RG')
      d.set('ocr_status', 'Processado')
      d.set('ocr_data', {
        nome: 'João Silva',
        rg: '12.345.678-9',
        data_nascimento: '01/01/1990',
      })
      app.save(d)
    }
  },
  (app) => {
    // empty down
  },
)
