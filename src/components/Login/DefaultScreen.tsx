// React imports
import { Link } from "react-router-dom";


// Context
import { useLoginMethodStore } from "../../stores/loginMethodStore";


// Custom components
import LoginBtn from "./LoginBtn";









export default function DefaultScreen() {

    const { setPhoneLogin } = useLoginMethodStore();

    const handleClick = () => {
        setPhoneLogin(true);
    }

    return (
        <div className="min-w-[400px] mt-14 flex flex-col justify-center items-center">
            <span className="mb-8 text-[24px] leading-[22px] font-medium">
                Is this your first order?
            </span>

            <div className="flex flex-col gap-4">
                <LoginBtn name="Previously ordered at Chef Kitchem" func={handleClick} />

                <Link   to="../register"
                        className="w-full py-[13px] px-[77px] text-white text-sm text-center leading-[22px] bg-[#8EC038] rounded-md hover:bg-[#B0CC0D] hover:scale-105 transition-all duration-300"
                >
                    This is my first order
                </Link>
            </div>
        </div>
    )
}
