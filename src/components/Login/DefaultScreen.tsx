// React imports
import { Link } from "react-router-dom";


// Context
import { useLoginMethodStore } from "../../stores/loginMethodStore";


// Custom components
import Button from "../common/Button";









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
                <Button name="Previously ordered at Chef Kitchem" func={handleClick} color="green" />

                <Link   to="../register"
                        className="w-full py-[13px] px-[77px] text-white text-sm text-center leading-[22px] bg-btnGreen rounded-md hover:bg-Olive hover:scale-105 transition-all duration-300"
                >
                    This is my first order
                </Link>
            </div>
        </div>
    )
}
