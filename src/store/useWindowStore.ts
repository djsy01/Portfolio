import { create } from "zustand";

export type PortfolioType = "frontend" | "backend" | "fullstack";

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
  portfolioType: PortfolioType | null;
  isTransitioning: boolean;
  switchTarget: PortfolioType | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  setSelectedProject: (projectId: number | null) => void;
  login: (type: PortfolioType) => void;
  logout: () => void;
  setTransitioning: (v: boolean) => void;
  setSwitchTarget: (type: PortfolioType | null) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  isLoggedIn: false,
  portfolioType: null,
  isTransitioning: false,
  switchTarget: null,
  login: (type) => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      set({ isLoggedIn: false, portfolioType: null });
    }, AUTO_LOGOUT_MS);
    set({ isLoggedIn: true, portfolioType: type });
  },
  logout: () => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = null;
    set({ isLoggedIn: false, portfolioType: null });
  },
  setTransitioning: (v) => set({ isTransitioning: v }),
  setSwitchTarget: (type) => set({ switchTarget: type }),
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
