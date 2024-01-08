import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import { User } from '../src/user/module/interface/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resetStore = () => {
  useUserStore.setState({}, true);
};

const storage: PersistStorage<User> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      cookies: '',
      name: '',
      yy: '',
      tmGbn: '',
      outStayFrDt: [],
      outStayToDt: [],
      outStayStGbn: [],
      setCookies: (cookies: string) => set(() => ({ cookies })),
      setName: (name: string) => set(() => ({ name })),
      setYy: (yy: string) => set(() => ({ yy })),
      setTmGbn: (tmGbn: string) => set(() => ({ tmGbn })),
      setOutStayFrDt: (outStayFrDt: string[]) => set(() => ({ outStayFrDt })),
      setOutStayToDt: (outStayToDt: string[]) => set(() => ({ outStayToDt })),
      setOutStayStGbn: (outStayStGbn: string[]) =>
        set(() => ({ outStayStGbn })),
      set: (newState) => set(() => ({ ...newState })),
    }),
    {
      name: 'userStore',
      storage,
    },
  ),
);
