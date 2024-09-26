import { create } from "zustand";



type State = {
    phoneLogin: boolean
    emailLogin: boolean
}



type Action = {
    setPhoneLogin: () => void,
    setEmailLogin: () => void,
}





export const useLoginMethodStore = create<State & Action>((set) => ({
    phoneLogin: false,
    setPhoneLogin: () => set((state) => ({ phoneLogin: !state.phoneLogin })),
    emailLogin: false,
    setEmailLogin: () => set((state) => ({ emailLogin: !state.emailLogin }))
}))
