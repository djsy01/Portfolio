import { create } from 'zustand';

interface AppState {
    isOpen: boolean;
    zIndex: number;
}

interface WindowStore {
    apps: Record<string, AppState>;
    focusedApp: string | null;
    nextZIndex: number;
    openApp: (id: string) => void;
    closeApp: (id: string) => void;
    focusApp: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
    apps: {
        terminal: { isOpen: false, zIndex: 10 },
        safari: { isOpen: false, zIndex: 10 },
        finder: { isOpen: false, zIndex: 10 },
    },
    focusedApp: null,
    nextZIndex: 20,
    openApp: (id) => set((state) => ({
        apps: { ...state.apps, [id]: { ...state.apps[id], isOpen: true, zIndex: state.nextZIndex } },
        focusedApp: id,
        nextZIndex: state.nextZIndex + 1,
    })),
    closeApp: (id) => set((state) => ({
        apps: { ...state.apps, [id]: { ...state.apps[id], isOpen: false } },
    })),
    focusApp: (id) => set((state) => ({
        apps: { ...state.apps, [id]: { ...state.apps[id], zIndex: state.nextZIndex } },
        focusedApp: id,
        nextZIndex: state.nextZIndex + 1,
    })),
}));