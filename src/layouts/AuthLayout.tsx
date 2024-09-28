// React imports
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";


// Constants
import { loginNumberOfImgs, loginImages } from "../lib/constants";


// Custom components
import ChangeLangMenu from "../components/common/ChangeLangMenu";


// Images
import logo from "../assets/images/Login/logo-login.svg";





export default function AuthLayout() {

    const randomInt = useRef<number | null>(null);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        randomInt.current = Math.floor(Math.random() * loginNumberOfImgs);
        setNumber(randomInt.current);
    }, [])



    return (
        <AnimatePresence>
            <motion.section initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-screen flex flex-row font-['Montserrat']"
            >
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

                                
                                <Outlet />
                                
                                <div className="mt-11 flex flex-col justify-center items-center">
                                    <a  href="#"
                                        className="text-base text-[#ACB6BE] font-['Montserrat'] mb-[10px]"
                                    >
                                        Forgot Password?
                                    </a>

                                    <span className="text-base text-[#ACB6BE] font-['Montserrat']">
                                        Not a member yet? <Link to="register" className="text-[#3056D3]">Sign Up</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                </div>
            </motion.section>
        </AnimatePresence>
    )
}
