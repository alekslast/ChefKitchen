import { create } from "zustand";



type State = {
    phoneLogin      :   boolean,
    emailLogin      :   boolean,
    confirmPhone    :   string,
    confirmEmail    :   string,
    enterCode       :   boolean,
}



type Action = {
    setPhoneLogin   :   (value: boolean) => void,
    setEmailLogin   :   (value: boolean) => void,
    setConfirmPhone :   (value: string) => void,
    setConfirmEmail :   (value: string) => void,
    setEnterCode    :   () => void,
}





export const useLoginMethodStore = create<State & Action>((set) => ({

    phoneLogin: false,
    setPhoneLogin: (value)      =>  set(() => ({ phoneLogin: value })),

    emailLogin: false,
    setEmailLogin: (value)      =>  set(() => ({ emailLogin: value })),

    confirmPhone: "",
    setConfirmPhone: (value)    =>  set(() => ({ confirmPhone: value })),

    confirmEmail: "",
    setConfirmEmail: (value)    =>  set(() => ({ confirmEmail: value })),

    enterCode: false,
    setEnterCode: ()            =>  set((state) => ({ enterCode: !state.enterCode })),

}))
