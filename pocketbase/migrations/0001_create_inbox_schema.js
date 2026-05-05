migrate(
  (app) => {
    const tenants = new Collection({
      name: 'tenants',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(tenants)

    const conversations = new Collection({
      name: 'conversations',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'patient_name', type: 'text' },
        { name: 'patient_whatsapp', type: 'text' },
        { name: 'patient_cpf', type: 'text' },
        {
          name: 'status',
          type: 'select',
          values: ['triagem_ia', 'aguardando_humano', 'em_atendimento', 'finalizada'],
          required: true,
          maxSelect: 1,
        },
        {
          name: 'tenant',
          type: 'relation',
          collectionId: tenants.id,
          required: true,
          maxSelect: 1,
        },
        { name: 'assigned_to', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(conversations)

    const messages = new Collection({
      name: 'messages',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'conversation',
          type: 'relation',
          collectionId: conversations.id,
          required: true,
          maxSelect: 1,
        },
        {
          name: 'author',
          type: 'select',
          values: ['paciente', 'ia', 'atendente'],
          required: true,
          maxSelect: 1,
        },
        { name: 'content', type: 'text', required: true },
        { name: 'sender_name', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(messages)

    const documents = new Collection({
      name: 'documents',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'conversation',
          type: 'relation',
          collectionId: conversations.id,
          required: true,
          maxSelect: 1,
        },
        {
          name: 'type',
          type: 'select',
          values: ['RG', 'CPF', 'Convenio', 'Pedido Medico'],
          required: true,
          maxSelect: 1,
        },
        { name: 'file', type: 'file', maxSelect: 1, maxSize: 5242880 },
        {
          name: 'ocr_status',
          type: 'select',
          values: ['Pendente', 'Processado', 'Falha'],
          required: true,
          maxSelect: 1,
        },
        { name: 'ocr_data', type: 'json', maxSize: 1048576 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(documents)

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.add(
      new SelectField({
        name: 'role',
        values: ['admin', 'gestor', 'diretor', 'atendente'],
        maxSelect: 1,
      }),
    )
    app.save(users)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('documents'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('messages'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('conversations'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('tenants'))
    } catch (_) {}
    try {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      users.fields.removeByName('role')
      app.save(users)
    } catch (_) {}
  },
)
