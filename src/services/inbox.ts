import pb from '@/lib/pocketbase/client'

export const getTenants = () => pb.collection('tenants').getFullList({ sort: 'name' })

export const getConversations = (page: number, filter: string) =>
  pb.collection('conversations').getList(page, 20, {
    filter,
    sort: '-updated',
    expand: 'tenant,assigned_to',
  })

export const getMessages = (conversationId: string) =>
  pb.collection('messages').getFullList({
    filter: `conversation = '${conversationId}'`,
    sort: 'created',
  })

export const getDocuments = (conversationId: string) =>
  pb.collection('documents').getFullList({
    filter: `conversation = '${conversationId}'`,
    sort: '-created',
  })

export const takeCall = (conversationId: string, userId: string) =>
  pb.collection('conversations').update(conversationId, {
    status: 'em_atendimento',
    assigned_to: userId,
  })

export const sendMessage = (conversationId: string, content: string, senderName: string) =>
  pb.collection('messages').create({
    conversation: conversationId,
    author: 'atendente',
    content,
    sender_name: senderName,
  })
