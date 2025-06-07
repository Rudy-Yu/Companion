import config from './config'
import { mockMessages } from '../data/mockData'

// Helper function to handle API calls
const apiCall = async (endpoint, options = {}) => {
  if (config.useMockData) {
    return null // Will be handled by mock data
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Get chat list
export const getChatList = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    // Group messages by chat
    const chats = mockMessages.reduce((acc, message) => {
      const chatId = message.chatId
      if (!acc[chatId]) {
        acc[chatId] = {
          id: chatId,
          companionId: message.companionId,
          companionName: message.companionName,
          companionPhoto: message.companionPhoto,
          lastMessage: message.content,
          lastMessageTime: message.timestamp,
          unreadCount: 0
        }
      }
      if (!message.read && message.senderId !== userId) {
        acc[chatId].unreadCount++
      }
      return acc
    }, {})

    return Object.values(chats).sort((a, b) => 
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    )
  }

  return apiCall(`/users/${userId}/chats`)
}

// Get chat messages
export const getChatMessages = async (chatId, options = {}) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    let messages = mockMessages.filter(message => message.chatId === Number(chatId))
    
    if (options.before) {
      messages = messages.filter(message => 
        new Date(message.timestamp) < new Date(options.before)
      )
    }
    
    if (options.after) {
      messages = messages.filter(message => 
        new Date(message.timestamp) > new Date(options.after)
      )
    }
    
    return messages.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    )
  }

  const queryParams = new URLSearchParams(options).toString()
  return apiCall(`/chats/${chatId}/messages?${queryParams}`)
}

// Send message
export const sendMessage = async (messageData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: {
        id: Date.now(),
        ...messageData,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }
    }
  }

  return apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData)
  })
}

// Mark messages as read
export const markMessagesAsRead = async (chatId, userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/chats/${chatId}/read`, {
    method: 'PUT',
    body: JSON.stringify({ userId })
  })
}

// Delete message
export const deleteMessage = async (messageId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/messages/${messageId}`, {
    method: 'DELETE'
  })
}

// Get unread message count
export const getUnreadMessageCount = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockMessages.filter(
      message => !message.read && message.senderId !== userId
    ).length
  }

  return apiCall(`/users/${userId}/unread-count`)
}

// Create new chat
export const createChat = async (userId, companionId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      chat: {
        id: Date.now(),
        userId,
        companionId,
        createdAt: new Date().toISOString()
      }
    }
  }

  return apiCall('/chats', {
    method: 'POST',
    body: JSON.stringify({ userId, companionId })
  })
}

// Get chat details
export const getChatDetails = async (chatId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const messages = mockMessages.filter(message => message.chatId === Number(chatId))
    if (messages.length === 0) return null

    return {
      id: chatId,
      companionId: messages[0].companionId,
      companionName: messages[0].companionName,
      companionPhoto: messages[0].companionPhoto,
      lastMessage: messages[messages.length - 1].content,
      lastMessageTime: messages[messages.length - 1].timestamp,
      unreadCount: messages.filter(m => !m.read).length
    }
  }

  return apiCall(`/chats/${chatId}`)
}

// Block user
export const blockUser = async (userId, blockedUserId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/block`, {
    method: 'POST',
    body: JSON.stringify({ blockedUserId })
  })
}

// Unblock user
export const unblockUser = async (userId, blockedUserId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/unblock`, {
    method: 'POST',
    body: JSON.stringify({ blockedUserId })
  })
}

// Get blocked users
export const getBlockedUsers = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      {
        id: 2,
        name: 'Blocked User',
        photo: 'https://example.com/photo.jpg'
      }
    ]
  }

  return apiCall(`/users/${userId}/blocked`)
}

// Report chat
export const reportChat = async (chatId, reportData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      success: true,
      reportId: 'mock_report_id'
    }
  }

  return apiCall(`/chats/${chatId}/report`, {
    method: 'POST',
    body: JSON.stringify(reportData)
  })
}

// Get chat participants
export const getChatParticipants = async (chatId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const messages = mockMessages.filter(message => message.chatId === Number(chatId))
    if (messages.length === 0) return []

    return [
      {
        id: messages[0].userId,
        name: messages[0].userName,
        photo: messages[0].userPhoto,
        role: 'user'
      },
      {
        id: messages[0].companionId,
        name: messages[0].companionName,
        photo: messages[0].companionPhoto,
        role: 'companion'
      }
    ]
  }

  return apiCall(`/chats/${chatId}/participants`)
} 