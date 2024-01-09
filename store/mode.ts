import { create } from 'zustand';

type Store = {
  isDarkMode: boolean;
  toggleMode: () => void;
};

export const useModeStore = create<Store>((set) => ({
  isDarkMode: false, // 초기 다크모드 설정
  toggleMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })), // 모드 전환 함수
}));

// mode, login 상태
