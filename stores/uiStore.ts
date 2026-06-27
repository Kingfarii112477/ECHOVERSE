import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

interface UIState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  currentPage: string;
  theme: 'dark';
  notifications: Notification[];
  toggleSidebar: () => void;
  setSidebarMobile: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  addNotification: (message: string, type: 'info' | 'success' | 'error') => void;
  dismissNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    message: 'Your audiobook "Peer-e-Kamil" is 65% complete',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    message: 'Voice generation completed for "Urdu Poetry Collection"',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    message: 'New voice "Aisha - Professional Urdu" added to your library',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-4',
    message: 'Your subscription will renew in 7 days',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  currentPage: 'dashboard',
  theme: 'dark',
  notifications: [],

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  setSidebarMobile: (sidebarMobileOpen) => set({ sidebarMobileOpen }),

  setCurrentPage: (currentPage) => set({ currentPage }),

  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        {
          id: `notif-${Date.now()}`,
          message,
          type,
          read: false,
          timestamp: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    })),

  clearAllNotifications: () => set({ notifications: [] }),
}));
