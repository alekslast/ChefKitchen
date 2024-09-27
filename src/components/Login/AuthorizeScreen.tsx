import { useLoginMethodStore } from "../../stores/loginMethodStore";
import LoginBtn from "./LoginBtn";


export default function AuthorizeScreen() {

    const { phoneLogin, emailLogin, setEmailLogin, setPhoneLogin } = useLoginMethodStore();

    const handleMethodChange = () => {
        setEmailLogin();
        setPhoneLogin();
    }

    const sendEmail = () => {
        alert("Simulating Email sending");
    }

    const sendSms = () => {
        alert("Simulating SMS sending");
    }



    return (
        <>
            <input  placeholder={ phoneLogin ? "Phone Number" : "E-mail" }
                    className="w-full py-[13px] px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />

            <span className="self-start ms-5 mt-2 mb-8 text-base text-[#ACB6BE] font-['Montserrat']">
                Авторизироваться&nbsp;
                <span   onClick={handleMethodChange}
                        className="underline cursor-pointer"
                >
                    { phoneLogin ? "по E-mail" : "по телефону" }
                </span>
            </span>

            <LoginBtn name="Send Code" func={ phoneLogin ? sendSms : sendEmail } />

            

            <div className="mt-11 flex flex-col justify-center items-center">
                <a  href="#"
                     className="text-base text-[#ACB6BE] font-['Montserrat'] mb-[10px]"
                >
                    Forgot Password?
                </a>

                <span className="text-base text-[#ACB6BE] font-['Montserrat']">
                    Not a member yet? <a href="#" className="text-[#3056D3]">Sign Up</a>
                </span>
            </div>
        </>
    )
}
