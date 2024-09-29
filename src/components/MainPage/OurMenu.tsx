// Constants
import { weekDays, nutrition } from "../../lib/constants";


// Custom components
import Button from "../common/Button";
import Heading2 from "../common/Heading2";
import MenuTypesBar from "./MenuTypesBar";
import MenuItemsSlider from "./MenuItemsSlider";


// Images
import sliderArrow from "../../assets/icons/slider-arrow.svg";
import notes from "../../assets/icons/MainPageMenuIcons/notes.svg";
import miscImg1 from "../../assets/images/MainPage/menuMiscImg1.png";
import miscImg2 from "../../assets/images/MainPage/menuMiscImg2.png";





export default function OurMenu() {
    return (
        <section className="relative max-w-[1200px] w-full h-max pt-[135px]">

            <img src={miscImg1} className="absolute top-[17%] -right-[5%]" />
            <img src={miscImg2} className="absolute z-10 -bottom-[8%] left-[50%]" />

            <Heading2>our menu</Heading2>

            <MenuTypesBar />


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


                <MenuItemsSlider />


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
