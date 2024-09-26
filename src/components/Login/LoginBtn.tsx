
type TLoginBtn = {
    name: string,
    func?: () => void,
}





export default function LoginBtn({
    name,
    func
} : TLoginBtn) {

    const handleBtnClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        func!();
    }


    
    return (
        <button onClick={handleBtnClick}
                className="w-full py-[13px] px-[77px] text-white text-sm leading-[22px] bg-[#8EC038] rounded-md hover:bg-[#B0CC0D] hover:scale-105 transition-all duration-300"
        >
            {name}
        </button>
    )
}