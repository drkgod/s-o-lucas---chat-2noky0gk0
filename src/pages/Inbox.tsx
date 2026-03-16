import ChatList from './inbox/ChatList'
import ChatArea from './inbox/ChatArea'
import ContactDetails from './inbox/ContactDetails'

export default function Inbox() {
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inbox Central</h1>
      </div>
      <div className="flex flex-1 h-[calc(100vh-10rem)] w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <ChatList className="w-1/3 max-w-[340px] border-r hidden md:flex" />
        <ChatArea className="flex-1" />
        <ContactDetails className="w-1/4 max-w-[300px] border-l hidden lg:flex" />
      </div>
    </div>
  )
}
