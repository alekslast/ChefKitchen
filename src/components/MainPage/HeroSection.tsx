// Raect imports

// Custom components
import Button from "../common/Button";


// Images
import heroImg from "../../assets/images/MainPage/hero-img.png";
import heroImgStandalone from "../../assets/images/MainPage/hero-img-standalone.png";





export default function HeroSection() {
    return (
        <div className="relative max-w-[1200px] w-full h-[450px] mt-[60px] bg-Olive rounded-[55px]">
            <img    src={heroImgStandalone}
                    className="absolute -bottom-[30%] -left-[8%]" />
            <img    src={heroImg}
                    className="absolute -right-[10%] -top-[30%]" />

            <div className="relative z-2 max-w-[400px] ms-[102px] mt-[54px]">
                <h1 className="mb-5 uppercase text-[65px] text-white font-bold leading-[100%]">
                    Your personal cook
                </h1>

                <span className="text-2xl leading-[59px]">
                    The balanced diet for every day
                </span>

                <Button name="Make your choice"
                        color="orange"
                        rounded={true}
                        styling="w-max mt-5 py-[18px] px-[27px] text-base font-bold hover:bg-white hover:text-Olive"
                />
            </div>
        </div>
    )
}
