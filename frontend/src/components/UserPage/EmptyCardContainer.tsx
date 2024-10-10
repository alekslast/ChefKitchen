import { useState } from "react";
import plusSign from "../../assets/icons/plusSign.svg";





export function EmptyCardContainer() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={`${isHovered ? "shadow-[0_0_4px_0_rgb(142,192,56)]" : "shadow-sm"} w-full h-[232px] max-w-[180px] flex flex-col justify-center items-center border border-[#CECECE] rounded-[10px] transition-all duration-300 ease-in-out`}>
            <div    className={`w-10 h-10 flex flex-col justify-center items-center ${isHovered ? "bg-btnGreen" : "bg-Orange"} transition-all duration-300 ease-in-out rounded-full cursor-pointer`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
            >
                <img src={plusSign} />
            </div>

            <span className="mt-[18px] text-sm font-semibold cursor-default">
                Add an item
            </span>
        </div>
    )
}
