// Tema warna untuk aplikasi
export const COLORS = {
  primary: {
    main: '#6366f1', // Indigo
    light: '#818cf8',
    dark: '#4f46e5',
  },
  secondary: {
    main: '#8b5cf6', // Violet
    light: '#a78bfa',
    dark: '#7c3aed',
  },
  accent: {
    main: '#ec4899', // Pink
    light: '#f472b6',
    dark: '#db2777',
  },
  neutral: {
    white: '#ffffff',
    light: '#f3f4f6',
    medium: '#9ca3af',
    dark: '#4b5563',
    black: '#1f2937',
  },
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
  info: '#3b82f6', // Blue
};

// Jenis layanan yang ditawarkan
export const SERVICE_TYPES = [
  {
    id: 'friend',
    name: 'Rent a Friend',
    description: 'Sewa teman untuk ngobrol, telepon, atau video call',
    icon: 'users',
    services: [
      { id: 'chat', name: 'Chat', pricePerHour: 30000 },
      { id: 'call', name: 'Telepon', pricePerHour: 50000 },
      { id: 'video', name: 'Video Call', pricePerHour: 70000 },
    ],
  },
  {
    id: 'lover',
    name: 'Rent a Lover',
    description: 'Sewa teman romantis untuk chat atau good morning text',
    icon: 'heart',
    services: [
      { id: 'romantic-chat', name: 'Chat Romantis', pricePerHour: 50000 },
      { id: 'gm-text', name: 'Good Morning Text', pricePerDay: 20000 },
    ],
  },
  {
    id: 'offline',
    name: 'Offline Date',
    description: 'Sewa teman untuk acara offline sesuai jadwal',
    icon: 'calendar',
    services: [
      { id: 'offline-date', name: 'Offline Date', pricePerHour: 150000 },
    ],
  },
];

// Rute navigasi
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  USER_PROFILE: '/user/profile',
  COMPANION_PROFILE: '/companion/profile',
  COMPANION_LIST: '/companions',
  COMPANION_DETAIL: '/companions/:id',
  BOOKING: '/booking/:id',
  PAYMENT: '/payment/:id',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_COMPANIONS: '/admin/companions',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_SETTINGS: '/admin/settings',
};

// Placeholder untuk API endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:5000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
  },
  COMPANIONS: {
    LIST: '/companions',
    DETAIL: '/companions/:id',
    SERVICES: '/companions/:id/services',
  },
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    DETAIL: '/bookings/:id',
  },
  PAYMENTS: {
    CREATE: '/payments',
    CONFIRM: '/payments/:id/confirm',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COMPANIONS: '/admin/companions',
    TRANSACTIONS: '/admin/transactions',
  },
};

