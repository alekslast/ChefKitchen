// React imports
import { Link }         from    "react-router-dom";
import { HashLink }     from    "react-router-hash-link";


// Constants
import { navItems }     from    "../../lib/constants";


// Custom components
import ChangeLangMenu   from    "./ChangeLangMenu";


// Images
import logo             from    "../../assets/images/logo.svg";
import phone            from    "../../assets/icons/phone-icon.svg";
import userIcon         from    "../../assets/icons/user-icon.svg";
import { useEffect, useState } from "react";
import { GetCookies } from "../../lib/helpers";



type TNavListItem = {
    text: string,
    link: string,
}





export default function Navbar() {

    const wantedCookie                  =   "token="
    const [tokenValue, setTokenValue]   =   useState<string | null>();

    useEffect(() => {

        debugger
        // const cookies = document.cookie.split(";");
        // cookies.map(cookie => {
        //     cookie = cookie.trim();
        //     if (cookie.startsWith("token=")) {
        //         const cookieValue = cookie.split("=")[1];
        //         setTokenValue(cookieValue);
        //     }
        // });
        const cookieValue = GetCookies(wantedCookie);
        setTokenValue(cookieValue);

        
    }, [tokenValue])

    return (
        <nav className="relative z-50 w-[1200px] mt-[15px] flex flex-row justify-between items-center">
            <Link to="/home">
                <img src={logo} />
            </Link>

            <ul className="flex flex-row gap-[70px] text-base text-[#302929] font-['Montserrat'] font-medium">

                {navItems.map((item) => (
                    <NavListItem key={item.text} text={item.text} link={item.link} />
                ))}
                
            </ul>

            <div className="flex flex-row gap-[37px] text-base font-['Montserrat'] font-bold">
                <div className="flex flex-row justify-center items-center">
                    <img src={phone} />
                    <span className="ms-1">591 902 883</span>
                </div>

                <ChangeLangMenu />

                {
                    tokenValue
                    ?
                    <Link   to="/user/settings"
                            className="w-[32px] bg-[#FFA800] rounded-full flex flex-row justify-center items-center py-[2px] ms-4 hover:bg-[#B0CC0D] transition-all duration-300"
                    >
                        <img src={userIcon} />
                    </Link>
                    :
                    <Link   to="/auth/login"
                            className="bg-[#FFA800] rounded-full flex flex-row items-center py-[2px] ps-[4px] ms-4 hover:bg-[#B0CC0D] transition-all duration-300"
                    >
                        <img src={userIcon} />
                        <span className="ps-5 pe-6 text-white">SIGN IN</span>
                    </Link>
                }
            </div>
        </nav>
    )
}





function NavListItem({
    text,
    link
} : TNavListItem)
{

    const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
        event.currentTarget.children[1].classList.add("scale-100");
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
        event.currentTarget.children[1].classList.remove("scale-100");
    }





    return (
        <li className="w-max hover:text-[#B0CC0D] transition-all duration-300 delay-[50] ease-in-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <HashLink to={link}>
                {text}
            </HashLink>
            <div className="line-to-show self-center border-b-2 border-b-[#B0CC0D] w-full scale-0 transition-all duration-300"></div>
        </li>
    )
}
