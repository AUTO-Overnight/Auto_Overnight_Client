import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../login/module/interface/login';

export const useUserStore = create<User>() (
  persist (
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
      setOutStayStGbn: (outStayStGbn: string[]) => set(() => ({ outStayStGbn })),
      set: (newState) => set(state => ({ ...state, ...newState })),
    }),
    {
      name: 'userStore',
      getStorage: () => sessionStorage,
    }
  )
)