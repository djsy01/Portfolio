import { create } from "zustand";

export type ProjectCategory = "frontend" | "backend" | "fullstack";

const AUTO_LOGOUT_MS = 5 * 60 * 1000; // 5분
let logoutTimer: ReturnType<typeof setTimeout> | null = null;

// Define the shape of the application state
interface AppState {
  isOpen: boolean;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowStore {
  apps: Record<string, AppState>;
  focusedApp: string | null;
  nextZIndex: number;
  selectedProject: number | null;
  isLoggedIn: boolean;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  setSelectedProject: (projectId: number | null) => void;
  login: () => void;
  logout: () => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  isLoggedIn: false,
  login: () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      set({ isLoggedIn: false });
    }, AUTO_LOGOUT_MS);
    set({ isLoggedIn: true });
  },
  logout: () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = null;
    set({ isLoggedIn: false });
  },
  apps: {
    terminal: {
      isOpen: false,
      zIndex: 10,
      isMinimized: false,
      isMaximized: false,
    },
    safari: {
      isOpen: false,
      zIndex: 10,
      isMinimized: false,
      isMaximized: false,
    },
    finder: {
      isOpen: false,
      zIndex: 11,
      isMinimized: false,
      isMaximized: false,
    },
  },
  focusedApp: null,
  nextZIndex: 20,
  selectedProject: null,
  openApp: (id) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [id]: {
          ...state.apps[id],
          isOpen: true,
          isMinimized: false,
          zIndex: state.nextZIndex,
        },
      },
      focusedApp: id,
      nextZIndex: state.nextZIndex + 1,
    })),
  closeApp: (id) =>
    set((state) => ({
      apps: { ...state.apps, [id]: { ...state.apps[id], isOpen: false } },
    })),
  focusApp: (id) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [id]: { ...state.apps[id], zIndex: state.nextZIndex },
      },
      focusedApp: id,
      nextZIndex: state.nextZIndex + 1,
    })),
  minimizeApp: (id) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [id]: { ...state.apps[id], isMinimized: !state.apps[id].isMinimized },
      },
    })),
  maximizeApp: (id) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [id]: { ...state.apps[id], isMaximized: !state.apps[id].isMaximized },
      },
    })),
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
}));
