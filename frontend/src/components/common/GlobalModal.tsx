import { useEffect } from "react"

type TGlobalModal = {
    children    :   React.ReactNode,
    size?       :   "lg" | "sm",
    visibility  :   boolean
}





export default function GlobalModal({
    children,
    size,
    visibility = false
} : TGlobalModal)
{

    return (
        <div className={`fixed top-0 left-0 ${visibility ? "z-50  bg-black/20 backdrop-blur-sm" : "-z-50 opacity-0 invisible"} w-screen h-screen flex flex-row justify-center items-center`}>
            <div className={`${visibility ? "scale-100 opacity-100" : "scale-125 opacity-0"} relative z-[100] w-[55%] h-[90%] px-8 py-8 flex flex-col justify-center items-start rounded-[20px] bg-white transition-all duration-[250ms]`}>
                {children}
            </div>
        </div>
    )
}
