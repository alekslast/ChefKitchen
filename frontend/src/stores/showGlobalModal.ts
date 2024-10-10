import { create } from "zustand";



type State = {
    modalShow      :   boolean
}



type Action = {
    setModalShow   :   (value: boolean) => void
}





export const useShowGlobalModalStore = create<State & Action>((set) => ({

    modalShow: false,
    setModalShow: (value)      =>  set(() => ({ modalShow: value })),

}))