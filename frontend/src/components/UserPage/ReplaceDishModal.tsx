import { meals } from "../../lib/constants";

import { useMenuItems } from "../../lib/hooks"

import Heading2 from "../common/Heading2";
import Button from "../common/Button";

import xButton from "../../assets/icons/xButton.svg";
import GlobalModal from "../common/GlobalModal";
import { useShowGlobalModalStore } from "../../stores/showGlobalModal";
import { useEffect } from "react";





export default function ReplaceDishModal() {

    const { menuItems, isLoading } = useMenuItems();
    const { modalShow, setModalShow } = useShowGlobalModalStore();

    const handleModalClose = () => {
        setModalShow(false);
    }

    
    useEffect(() => {

        if (modalShow) {
            // document.querySelector("body")?.setAttribute("overflow-y", "hidden");
            document.body.classList.add('overflow-y-hidden');
        }
        else {
            // document.querySelector("body")?.setAttribute("overflow-y", "auto");
            document.body.classList.remove('overflow-y-hidden');
        }

    }, [modalShow])

    return (

        <GlobalModal visibility={modalShow}>
            <Heading2>Reaplace A Meal</Heading2>

            <img    src={xButton}
                    onClick={handleModalClose}
                    className="absolute top-6 right-7 cursor-pointer"
            />

            <span className="mt-[17px] mb-[32px]">
                Balanced nutrition for every day<br />
                Five meals a day for ~1,800 kcal/day to maintain optimal shape
            </span>

            <div>

            </div>

            <div className="custom-horizontal-scroll p-2 flex flex-row flex-wrap justify-center items-center gap-5 overflow-y-scroll">
                {menuItems?.map((mealItem, index) => (
                    <div key={index} className={`w-max max-w-[220px] h-max px-[13px] pb-[13px] flex flex-col justify-center items-center rounded-[16px] shadow-[0_0_7px_0_rgba(0,0,0,0.2)] cursor-pointer`}>
                        <img src={meals[index].image} />

                        <div className="w-full mt-2 flex flex-row justify-between items-center gap-4">
                            <span className="text-[14px] text-Olive font-medium leading-[120%]">
                                {mealItem.mealType}
                            </span>
                        </div>

                        <span className="w-full mt-3 text-[13px] font-medium leading-[120%]">
                            {mealItem.mealName}
                        </span>

                        <span className="mt-2 self-start text-sm font-light leading-[180%]">
                            {mealItem.energy}kcal, {mealItem.totalWeight}g
                        </span>
                    </div>
                ))}
            </div>

            <Button name="Replace Meal" color="orange" styling="w-max mt-8 self-center" />
        </GlobalModal>
    )
}
