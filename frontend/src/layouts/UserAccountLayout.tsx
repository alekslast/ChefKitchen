// React imports
import { Outlet } from "react-router-dom";


// Constants
import { userSettings_Sidebar } from "../lib/constants";





type TSidebarListItem = {
    icon        :   string,
    text        :   string,
    isActive?   :   boolean
}



function SidebarListItem({
    icon,
    text,
    isActive
} :TSidebarListItem)
{
    return (
        <li>
            <a   href={`${text.toLowerCase()}`}
            // #F4F4F4
            // d4d4d4
                    className={`${isActive ? "bg-[#d4d4d4]" : "bg-white"} px-6 py-[13px] flex flex-row gap-[15px] hover:bg-[#f4f4f4] transition-all duration-300 ease-in-out cursor-pointer`}
            >
                <img src={icon} />
                <span className="text-base text-[#302929] font-medium leading-6">
                    {text}
                </span>
            </a>
        </li>
    )
}





export default function UserAccountLayout() {

    // const [activePage, setActivePage] = useState("");

    // useEffect(() => {
    //     const handleUrlChange = () => {
    //         const activeURL = window.location.pathname.split("/")[2];
    //         setActivePage(activeURL);
    //         console.log(`Active link is - ${activePage} from ${activeURL}`);
    //     }
        
    //     window.addEventListener("", handleUrlChange);

    //     return () => {
    //         window.removeEventListener("locationchange", handleUrlChange);
    //     };
    // }, []);

    



    return (
        <div className="w-full max-w-[1200px] pt-[77px] pb-16 flex flex-row justify-between items-start gap-[102px]">

            <aside className="pt-[30px] pb-[50px] rounded-[10px] shadow-[0_0_15px_0_rgba(0,0,0,.18)]">
                <ul className="w-max">
                    {userSettings_Sidebar.map((item) => (
                        <SidebarListItem    key={item.text}
                                            icon={item.icon}
                                            text={item.text}
                                            // isActive={activePage === item.text.toLowerCase()}
                        />
                    ))}
                </ul>
            </aside>

            <Outlet />
        </div>
    )
}
