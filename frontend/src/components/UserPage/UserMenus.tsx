import { useState } from "react";
import Heading2 from "../common/Heading2";
import { EmptyCardContainer } from "./EmptyCardContainer";
import SumUpCard from "./SumUpCard";
import UserMenuCardContainer from "./UserMenuCardContainer";
import UserMenusPreOrder from "./UserMenusPreOrder";


// Images



export default function UserMenus() {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }





    return (
        <div className="w-full flex flex-col">
            <Heading2>menus</Heading2>

            <div className="mt-8 mb-5 flex flex-row items-center gap-5">
                <h3 className="text-2xl text-black font-medium">
                    Select menu with the nearest delivery <span className="underline font-medium">May 29, Mon</span>
                </h3>

                <div    onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`${isHovered ? "bg-Orange" : "bg-white"} w-[38px] h-[38px] flex flex-col justify-center items-center border border-Orange rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <svg className={`${isHovered ? "fill-white" : "fill-Orange"} transition-all duration-300 ease-in-out`} width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6636 1.98157L9.12797 9.74654C9.03826 9.83871 8.94107 9.90384 8.83641 9.94194C8.73175 9.98064 8.61961 10 8.5 10C8.38039 10 8.26825 9.98064 8.16359 9.94194C8.05893 9.90384 7.96174 9.83871 7.87203 9.74654L0.313984 1.98157C0.104661 1.76651 -3.71647e-07 1.4977 -3.85748e-07 1.17512C-3.99848e-07 0.852535 0.112137 0.576038 0.336411 0.345623C0.560686 0.115209 0.822339 9.17729e-07 1.12137 9.04658e-07C1.4204 8.91586e-07 1.68206 0.115209 1.90633 0.345623L8.5 7.11982L15.0937 0.345622C15.303 0.130569 15.5608 0.023042 15.867 0.023042C16.1738 0.023042 16.4393 0.138249 16.6636 0.368664C16.8879 0.599078 17 0.867895 17 1.17511C17 1.48233 16.8879 1.75115 16.6636 1.98157Z"/>
                    </svg>
                </div>
            </div>
            
            <span>
                Balanced nutrition for every day<br />
                Five meals a day for ~1,800 kcal/day to maintain optimal shape during active training
            </span>

            

            <div className="w-full mt-7 flex flex-row justify-between">
                <div className="w-[630px] flex flex-col">

                    <div className="relative z-10 mb-8 flex flex-row gap-2">
                        <WeekdayCard>MON, 31.07</WeekdayCard>
                        <WeekdayCard>TUE, 01.08</WeekdayCard>
                        <WeekdayCard>WED, 02.08</WeekdayCard>
                        <WeekdayCard>THU, 03.08</WeekdayCard>
                        <WeekdayCard>FRI, 04.08</WeekdayCard>
                        <WeekdayCard>SAT, 05.08</WeekdayCard>
                        <WeekdayCard>SUN, 06.08</WeekdayCard>
                    </div>

                    <div className="w-full flex flex-row flex-wrap gap-[33px]">
                        <UserMenuCardContainer />

                        <EmptyCardContainer />

                        <SumUpCard />
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 underline cursor-pointer">
                        How to make an order?
                    </span>

                    <UserMenusPreOrder />
                </div>
            </div>

            <span className="w-full max-w-[630px] text-sm text-[#637381] cursor-default">
                Photos of dishes on the site are a serving option for the dish. The appearance of the dish may differ from the photo on the site.
            </span>
        </div>
    )
}





function WeekdayCard({ children } : { children : React.ReactNode }) {
    return (
        <span className="py-2 px-[6px] text-[#302929] text-sm text-center font-bold leading-[120%] rounded-[10px] hover:bg-Olive hover:text-white transition-all duration-300 cursor-pointer first:bg-Olive first:text-white">
            {children}
        </span>
    )
}
