import { useState } from 'react'
import PlayfulCard from '../../components/PlayfulCard'
import PlayfulButton from '../../components/PlayfulButton'

function ProfileMessages() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats] = useState([
    {
      id: 1,
      companion: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'Looking forward to our tour tomorrow!',
      time: '10:30 AM',
      unread: 2
    },
    {
      id: 2,
      companion: 'Mike Chen',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'I can help you with that itinerary.',
      time: 'Yesterday',
      unread: 0
    }
  ])

  const [messages] = useState({
    1: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        content: 'Hi! I saw your booking request.',
        time: '10:00 AM'
      },
      {
        id: 2,
        sender: 'You',
        content: "Yes, I'm looking forward to exploring Tokyo!",
        time: '10:15 AM'
      },
      {
        id: 3,
        sender: 'Sarah Johnson',
        content: 'Looking forward to our tour tomorrow!',
        time: '10:30 AM'
      }
    ]
  })

  const renderChatList = () => (
    <div className="space-y-2">
      {chats.map((chat) => (
        <button
          key={chat.id}
          className={`w-full p-4 rounded-lg flex items-center space-x-3 ${
            selectedChat === chat.id
              ? 'bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedChat(chat.id)}
        >
          <img
            src={chat.photo}
            alt={chat.companion}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900">{chat.companion}</p>
              <p className="text-xs text-gray-500">{chat.time}</p>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
              {chat.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  )

  const renderChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a chat to start messaging
        </div>
      )
    }

    const chat = chats.find((c) => c.id === selectedChat)
    const chatMessages = messages[selectedChat] || []

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 p-4 border-b">
          <img
            src={chat.photo}
            alt={chat.companion}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{chat.companion}</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'You'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-75">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <PlayfulButton variant="primary">Send</PlayfulButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PlayfulCard className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <PlayfulButton variant="primary" size="small">
            New Message
          </PlayfulButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1">
            {renderChatList()}
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 h-[600px] bg-white rounded-lg border">
            {renderChatWindow()}
          </div>
        </div>
      </PlayfulCard>
    </div>
  )
}

export default ProfileMessages 