
type TRegisterBtn = {
    name: string,
    func?: () => void,
}





export default function RegisterBtn({
    name,
    func
} : TRegisterBtn) 
{

    const handleBtnClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        if (func) {
            func();
        }
    }



    return (
        <button onClick={handleBtnClick}
                className="w-full py-[13px] px-[77px] text-white text-sm leading-[22px] bg-[#FFA800] rounded-md hover:bg-[#B0CC0D] hover:scale-105 transition-all duration-300"
        >
            {name}
        </button>
    )
}
