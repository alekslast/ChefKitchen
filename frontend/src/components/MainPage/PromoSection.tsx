// React imports
import { Link } from "react-router-dom";


// Images
import promoImg1 from "../../assets/images/MainPage/promoImg1.png";
import promoImg2 from "../../assets/images/MainPage/promoImg2.png";





export default function PromoSection() {
    return (
        <section className="w-screen h-80 bg-Olive">
            <div className="relative w-full h-full flex flex-row">
                <div className="max-w-[380px] h-max flex flex-col ms-[120px] mt-5">
                    <h2 className="uppercase text-[40px] text-white font-bold leading-[120%]">
                        1 day at the<br />price of 23&#36;
                    </h2>

                    <span className="my-5 text-xl text-white font-normal leading-[120%]">
                        Make orders, take part in promotions, recommend us to friends or connect
                    </span>


                    {/* <Button name="Sign Up" rounded={true} color="orange" styling="" /> */}
                    <Link   to="/auth/register"
                            className="w-max text-base text-white font-bold py-[16px] px-[60px] bg-Orange rounded-full hover:bg-white hover:text-Olive transition-all duration-300"
                    >
                        Sign Up
                    </Link>
                </div>

                <img src={promoImg1} className="absolute -top-[28%] right-[23%]" />
                <img src={promoImg2} className="absolute -top-[13%] right-4 w-max h-max" />
            </div>
        </section>
    )
}
