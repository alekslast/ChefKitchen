// Images
import arrowDown from "../../assets/icons/arrow-down.svg";





export default function ChangeLangMenu() {
    return (
        <div className="flex flex-row justify-center items-center">
            <span className="me-1 font-bold cursor-default">RU</span>
            <img src={arrowDown} className="hover:rotate-180 hover:cursor-pointer transition-all duration-300 ease-in-out" />
        </div>
    )
}
