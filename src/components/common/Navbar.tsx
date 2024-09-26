// React imports
import { Link } from "react-router-dom";


// Constants
import { navItems } from "../../lib/constants";


// Images
import logo from "../../assets/images/logo.svg";
import phone from "../../assets/icons/phone-icon.svg";
import userIcon from "../../assets/icons/user-icon.svg";
import ChangeLangMenu from "./ChangeLangMenu";



type TNavListItem = {
    itemName: string
}





export default function Navbar() {

    return (
        <nav className="w-[1200px] flex flex-row justify-between items-center">
            <img src={logo} />

            <ul className="flex flex-row gap-[70px] text-base text-[#302929] font-['Montserrat'] font-medium">

                {navItems.map((itemName) => (
                    <NavListItem key={itemName} itemName={itemName} />
                ))}
                
            </ul>

            <div className="flex flex-row gap-[37px] text-base font-['Montserrat'] font-bold">
                <div className="flex flex-row justify-center items-center">
                    <img src={phone} />
                    <span className="ms-1">591 902 883</span>
                </div>

                <ChangeLangMenu />

                <Link   to="/login"
                        className="bg-[#FFA800] rounded-full flex flex-row items-center py-[2px] ps-[4px] ms-4 hover:bg-[#B0CC0D] transition-all duration-300"
                >
                    <img src={userIcon} />
                    <span className="ps-5 pe-6 text-white">SIGN IN</span>
                </Link>
            </div>
        </nav>
    )
}





function NavListItem({ itemName } : TNavListItem) {

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
            <a href="#">{itemName}</a>
            <div className="line-to-show self-center border-b-2 border-b-[#B0CC0D] w-full scale-0 transition-all duration-300"></div>
        </li>
    )
}
