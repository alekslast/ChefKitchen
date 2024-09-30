// Custom components
import Button from "../common/Button";


// Images
import telegramIcon from "../../assets/icons/telegramIcon.svg";
import formMainIng from "../../assets/images/MainPage/formMainImg.png";
import formDecorImg from "../../assets/images/MainPage/fromDecorImg.png";
import { useState } from "react";





export default function FormSection() {



    return (
        <section className="relative w-full max-w-[1200px] pt-[94px] pb-[120px] flex flex-row">
            <img src={formDecorImg} className="absolute z-10 -top-[25%] -right-[6%]" />
            
            <div className="w-1/3 flex flex-col justify-center items-start">
                <img src={formMainIng} />
            </div>

            <div className="w-1/3 flex flex-col justify-center items-start">
                <h2 className="text-[64px] text-Olive font-bold leading-[120%]">
                    LET'S GET<br />IN TOUCH
                </h2>

                <span className="mt-5 text-[20px] leading-[120%]">
                    Make orders, take part in promotions, recommend us to friends or connect 
                </span>
            </div>

            <div className="w-1/3">
                <form>
                    <div className="mb-6 flex flex-row gap-3">
                        <FormInputField>Your Name</FormInputField>
                        <FormInputField>Your Phone Number</FormInputField>
                    </div>
                    <FormInputField>Your E-mail</FormInputField>
                    
                    <div className="my-6 flex flex-row gap-1">
                        <Button name="Make Your Choice" color="orange" rounded={true} styling="w-max !px-[27px] font-bold hover:scale-[1.02]" />

                        <TelegramBtn />
                    </div>
                    
                </form>
            </div>
        </section>
    )
}





function TelegramBtn() {

    const [isHovered, setIsHovered] = useState(false);

    const handleTelegramHover = (value: boolean) => {
        setIsHovered(value);
    }

    return (
        <div    onMouseEnter={() => handleTelegramHover(true)}
                onMouseLeave={() => handleTelegramHover(false)}
                className={`relative flex items-center bg-Olive rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isHovered ? 'w-[180px] px-[20px]' : 'w-[73px] ps-[20px]'} py-[18px]`}
        >
            <img src={telegramIcon} className="relative z-20" />

            <span   className={`relative text-white font-bold transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 ms-[15px]' : 'opacity-0 ms-0'} overflow-hidden`}
                    style={{ whiteSpace: 'nowrap' }}
            >
                Telegram
            </span>
        </div>
    );
}





type TFormInputField = {
    children: string
}



function FormInputField({ children } : TFormInputField) {
    
    return (
        <input  placeholder={children}
                className="w-full py-[18px] px-[27px] text-base text-[#656565] bg-[#F4F4F4] rounded-[32px] outline-none"
        />
    )
}
