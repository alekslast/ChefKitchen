// Constants
import { menuTypes } from '../../lib/constants'

export default function MenuTypesBar() {
    return (
        <div className="relative my-10 flex flex-row gap-7 cursor-pointer">
            {menuTypes.map((type, index) => (
                <div key={index} className={`${index % 2 == 0 ? "px-10" : "px-7"} py-[5px] flex flex-col justify-center items-center ${index === 0 ? "bg-[#B0CC0D] text-white" : "bg-[#D9D9D9] text-[#6A6A6A]"} rounded-[10px] hover:bg-Orange hover:text-white transition-all duration-300`}>
                    <span className="uppercase font-bold text-lg">
                        {type.name}
                    </span>

                    <span className="text-xs">
                        {type.kcal}
                    </span>
                </div>
            ))}
        </div>
    )
}
