// Constants
import { loginNumberOfImgs, loginImages } from "../../lib/constants";


// Images
import logo from "../../assets/images/Login/logo-login.svg";
import { useEffect, useRef, useState } from "react";
import ChangeLangMenu from "../common/ChangeLangMenu";
import DefaultScreen from "./DefaultScreen";
import { useLoginMethodStore } from "../../stores/loginMethodStore";
import AuthorizeScreen from "./AuthorizeScreen";





export default function Login() {

    const randomInt = useRef<number | null>(null);
    const [number, setNumber] = useState(0);

    const { phoneLogin, emailLogin } = useLoginMethodStore();

    useEffect(() => {
        randomInt.current = Math.floor(Math.random() * loginNumberOfImgs);
        setNumber(randomInt.current);
    }, [])





    return (
        <section className="w-screen flex flex-row font-['Montserrat']">
            <div className="h-screen w-1/2 flex flex-row">
                <img src={loginImages[number]} className="h-full" />
            </div>

            <div className="realative w-1/2 flex flex-col items-start">
                    <div className="absolute right-[15%] top-11">
                        <ChangeLangMenu />
                    </div>

                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <img src={logo} />

                            <form className="min-w-[400px] mt-14 flex flex-col justify-center items-center">
                                { phoneLogin || emailLogin || <DefaultScreen /> }
                                { (phoneLogin || emailLogin) && <AuthorizeScreen /> }
                            </form>
                        </div>
                    </div>
            </div>
        </section>
    )
}
