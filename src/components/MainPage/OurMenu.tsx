// Constants
import { menuTypes, weekDays, nutrition, meals } from "../../lib/constants";


// Custom components
import { Button } from "../common/Button";
import Heading2 from "../common/Heading2";


// Images
import sliderArrow from "../../assets/icons/slider-arrow.svg";
import notes from "../../assets/icons/MainPageMenuIcons/notes.svg";





export default function OurMenu() {
    return (
        <section className="w-full h-screen pt-[135px]">
            <Heading2>our menu</Heading2>

            <div className="my-10 flex flex-row gap-7 cursor-pointer">
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

            <div className="w-full bg-Olive rounded-3xl px-10 pt-[38px] pb-[54px]">
                
                <div className="mb-8 flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        {weekDays.map((day) => (
                            <div key={day} className="w-max text-[#302929] text-base font-medium py-[14px] px-[26px] bg-white/[.5] rounded-xl hover:bg-white transition-all duration-300 cursor-pointer">
                                <span>
                                    {day}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <img src={sliderArrow} className="cursor-pointer rounded-full hover:bg-Orange transition-all duration-300" />

                        <div className="mx-[16px] flex flex-col justify-center items-center text-white">
                            <span className="text-[24px] font-bold leading-[120%]">
                                WEEK 1
                            </span>

                            <span className="px-[6px] text-base bg-Orange font-light rounded-[5px]">
                                This week
                            </span>
                        </div>

                        <img src={sliderArrow} className="rotate-180 cursor-pointer rounded-full hover:bg-Orange transition-all duration-300" />
                    </div>
                </div>


                <div className="w-max flex flex-row gap-3 overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                    {meals.map((meal, index) => (
                        <MenuItemCard key={index} number={meal.number} image={meal.image} mealName={meal.mealName} mealType={meal.mealType} nutrition={meal.nutrition} />
                    ))}
                </div>


                <p className="w-full my-8 text-base text-white font-normal cursor-default">
                    A balanced menu helps to maintain health and a slim figure, allows you to be cheerful and active throughout the week. While preparing our dishes, we use products from the best suppliers and always choose products that correspond to the concept of healthy nutrition. For example, lean beef, turkey and chicken, low-calorie sauces, pasta of hard varieties. Delivery is carried out every 2 days.
                </p>

                <div className="w-full h-20 px-3 flex flex-row items-center bg-white rounded-2xl">

                    <div className="px-4 py-[2px] flex flex-row underline gap-3 uppercase text-white font-bold bg-Orange shadow-[0_0_7px_0_rgba(255,168,0,1)] rounded-[10px] cursor-pointer hover:bg-Olive hover:shadow-Olive transition-all duration-300">
                        <img src={notes} />

                        <div className="flex flex-col">
                            <span>
                                from 56
                            </span>

                            <span>
                                gel/day
                            </span>
                        </div>
                    </div>

                    <div className="ms-4 flex flex-col">
                        <span>
                            Total on
                        </span>
                        
                        <span>
                            Tuesday:
                        </span>

                        <span>
                            1435 kcal
                        </span>
                    </div>

                    <div className="ms-[12%] me-20 flex flex-row gap-10">
                        {nutrition.map(item => (
                            <div key={item.name} className="flex flex-row gap-[6px]">
                                <img src={item.image} />
                                
                                <div className="flex flex-col">
                                    <span className="text-[26px] text-black font-extrabold leading-[120%]">
                                        {item.amount}
                                    </span>

                                    <span className="text-base font-medium leading-[120%] -mt-[6px]">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button name="Order Now" color="orange" rounded={true} styling="w-max font-bold" />
                </div>
            </div>
        </section>
    )
}


function WeekDayCard()
{
    return (
        <>
        </>
    )
}


function MenuTypeCard()
{
    return (
        <>
        </>
    )
}





type TMenuItemCard = {
    number      :   string,
    image       :   string,
    mealType    :   string,
    mealName    :   string,
    nutrition   :   string[],
}


function MenuItemCard({
    number,
    image,
    mealType,
    mealName,
    nutrition
} : TMenuItemCard)
{
    return (
        <div className="relative px-4 pb-4 flex flex-col text-base bg-white rounded-xl cursor-pointer snap-center">
            <div className="absolute -top-[4%] -right-[6%] h-12 w-12 text-[24px] flex flex-col justify-center items-center text-white font-extrabold bg-Orange rounded-full">
                {number}
            </div>

            <img src={image} className="w-max" />

            <span className="text-Olive">
                {mealType}
            </span>

            <span className="max-w-[200px] my-[10px] text-black">
                {mealName}
            </span>

            <div className="flex flex-col">
                {nutrition.map(((item, index) => (
                    <MenuItemNutritionSpan key={index} info={item} />
                )))}
            </div>
        </div>
    )
}



type TMenuItemNutritionSpan = {
    info: string,
}


function MenuItemNutritionSpan({ info } : TMenuItemNutritionSpan)
{
    return (
        <span className="text-xs font-light leading-[180%]">
            {info}
        </span>
    )
}