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
        // <div className={`absolute top-0 left-0 ${visibility ? "z-50 opacity-100" : "-z-50 opacity-0"} w-screen h-screen flex flex-row justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm`}>
        <div className={`fixed top-0 left-0 ${visibility ? "z-50 opacity-100 bg-black/20 backdrop-blur-sm" : "-z-50 opacity-0 invisible"} w-screen h-screen flex flex-row justify-center items-center`}>
            <div className={`relative z-50 w-[55%] h-max max-h-[1000px] px-8 py-8 flex flex-col justify-center items-start rounded-[20px] bg-white`}>
                {children}
            </div>
        </div>
    )
}
