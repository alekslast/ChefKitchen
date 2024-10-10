import { mealsDummy, meals } from "../../lib/constants";
import { useShowGlobalModalStore } from "../../stores/showGlobalModal";





type TUserMenuCardContainer = {
    styling?        :   string,
    image?          :   string,
    mealName?       :   string,
    mealType?       :   string,
    energy?         :   number,
    totalWeight?    :   number,
}



export default function UserMenuCardContainer({
    styling,
    image,
    mealName,
    mealType,
    energy,
    totalWeight
} : TUserMenuCardContainer)
{

    const mealItem = mealsDummy[0];

    const { setModalShow } = useShowGlobalModalStore();

    const handleModalOpen = () => {
        setModalShow(true);
    }





    return (
        <div className={`${styling} w-full max-w-[190px] h-[232px] flex flex-col justify-center items-center cursor-default`}>
            <img src={meals[0].image} />

            <div className="w-full mt-2 flex flex-row justify-between items-center gap-4">
                <span className="text-[14px] text-Olive font-medium leading-[120%]">
                    {mealItem.mealType}
                </span>

                <button onClick={handleModalOpen}
                        className="px-[8px] py-[1px] text-[14px] text-white font-semibold bg-btnGreen border border-btnGreen rounded-[4px] hover:bg-white hover:text-btnGreen transition-all duration-300">
                    Replace
                </button>
            </div>

            <span className="w-full mt-3 text-[13px] font-medium leading-[120%]">
                {mealItem.mealName}
            </span>

            <span className="mt-2 self-start text-sm font-light leading-[180%]">
                {mealItem.energy}kcal, {mealItem.totalWeight}g
            </span>
        </div>
    )
}
