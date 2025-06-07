import config from './config'

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

// Create payment intent
export const createPaymentIntent = async (amount, currency = 'USD') => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      clientSecret: 'mock_client_secret',
      paymentIntentId: 'mock_payment_intent_id'
    }
  }

  return apiCall('/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify({ amount, currency })
  })
}

// Process payment
export const processPayment = async (paymentData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      success: true,
      transactionId: 'mock_transaction_id',
      status: 'succeeded',
      amount: paymentData.amount,
      currency: paymentData.currency
    }
  }

  return apiCall('/payments/process', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  })
}

// Get payment methods
export const getPaymentMethods = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      {
        id: 1,
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      },
      {
        id: 2,
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        expiryMonth: 10,
        expiryYear: 2024,
        isDefault: false
      }
    ]
  }

  return apiCall(`/users/${userId}/payment-methods`)
}

// Add payment method
export const addPaymentMethod = async (userId, paymentMethodData) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      paymentMethod: {
        id: Date.now(),
        ...paymentMethodData,
        isDefault: false
      }
    }
  }

  return apiCall(`/users/${userId}/payment-methods`, {
    method: 'POST',
    body: JSON.stringify(paymentMethodData)
  })
}

// Remove payment method
export const removePaymentMethod = async (userId, paymentMethodId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/payment-methods/${paymentMethodId}`, {
    method: 'DELETE'
  })
}

// Set default payment method
export const setDefaultPaymentMethod = async (userId, paymentMethodId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }

  return apiCall(`/users/${userId}/payment-methods/${paymentMethodId}/default`, {
    method: 'PUT'
  })
}

// Get payment history
export const getPaymentHistory = async (userId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      {
        id: 1,
        amount: 100,
        currency: 'USD',
        status: 'succeeded',
        date: '2024-03-20T10:00:00Z',
        description: 'Booking payment for Sarah Johnson',
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'visa'
        }
      },
      {
        id: 2,
        amount: 150,
        currency: 'USD',
        status: 'succeeded',
        date: '2024-03-15T14:30:00Z',
        description: 'Booking payment for Emma Wilson',
        paymentMethod: {
          type: 'card',
          last4: '5555',
          brand: 'mastercard'
        }
      }
    ]
  }

  return apiCall(`/users/${userId}/payment-history`)
}

// Get payment details
export const getPaymentDetails = async (paymentId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      id: paymentId,
      amount: 100,
      currency: 'USD',
      status: 'succeeded',
      date: '2024-03-20T10:00:00Z',
      description: 'Booking payment for Sarah Johnson',
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'visa'
      },
      receipt: {
        url: 'https://example.com/receipts/mock-receipt.pdf'
      }
    }
  }

  return apiCall(`/payments/${paymentId}`)
}

// Request refund
export const requestRefund = async (paymentId, reason) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      refundId: 'mock_refund_id',
      status: 'pending',
      amount: 100,
      currency: 'USD'
    }
  }

  return apiCall(`/payments/${paymentId}/refund`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  })
}

// Get refund status
export const getRefundStatus = async (refundId) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      id: refundId,
      status: 'completed',
      amount: 100,
      currency: 'USD',
      date: '2024-03-21T10:00:00Z'
    }
  }

  return apiCall(`/payments/refunds/${refundId}`)
}

// Get available currencies
export const getAvailableCurrencies = async () => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [
      { code: 'USD', name: 'US Dollar', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'GBP', name: 'British Pound', symbol: '£' },
      { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
    ]
  }

  return apiCall('/payments/currencies')
}

// Get exchange rate
export const getExchangeRate = async (fromCurrency, toCurrency) => {
  if (config.useMockData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      from: fromCurrency,
      to: toCurrency,
      rate: 1.2,
      timestamp: new Date().toISOString()
    }
  }

  return apiCall(`/payments/exchange-rate?from=${fromCurrency}&to=${toCurrency}`)
} 