// Custom components
import Button                   from    "../common/Button"


// Constants
import { userSettings_Sidebar } from    "../../lib/constants"; 


// Custom components
import Heading4                 from    "../common/Heading4";



// Images
import exitIcon                 from    "../../assets/icons/UserSettings/user-settings-logOut.svg";
import bonusIcon                from    "../../assets/icons/UserSettings/user-settings-bonuses.svg";





export default function UserSettings() {

    const logoutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    }

    const buttonSubmitClick = () => {

    }


    return (
        <div className="w-full max-w-[1200px] pt-[77px] pb-16 flex flex-row justify-between items-start gap-[102px]">

            <aside className="pt-[30px] pb-[50px] rounded-[10px] shadow-[0_0_15px_0_rgba(0,0,0,.18)]">
                <ul className="w-max">
                    {userSettings_Sidebar.map((item) => (
                        <SidebarListItem key={item.text} icon={item.icon} text={item.text} />
                    ))}
                </ul>
            </aside>



            <section>
                <div className="mb-[30px] flex flex-col">
                    <h2 className="mb-[5px] text-2xl text-[#212B36] font-semibold leading-[30px]">
                        Settings Page
                    </h2>

                    <span className="text-sm text-[#637381] font-medium leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices lectus sem.
                    </span>
                </div>

                
                <form className="flex flex-col">
                    <div className="flex flex-col">
                        <Heading4 styling="ms-1">Bonuses</Heading4>

                        <div className="mt-1 flex flex-row items-center gap-9">
                            <div className="ps-[18px] pe-10 py-4 flex flex-row justify-center items-center gap-[22px] border border-[#D9D9D9] rounded-[10px]">
                                <div>
                                    <img src={bonusIcon} />
                                </div>

                                <span className="text-2xl text-[#212B36] font-semibold leading-[30px]">
                                    456 bonuses
                                </span>
                            </div>

                            <span className="text-sm text-[#637381] font-medium leading-5">
                                You can spend your bonuses on vatious things
                            </span>
                        </div>
                    </div>


                    <UserSectionCard heading="Account Info">
                        <UserInputElem label="First Name"       placeholder="John"                  nameAttr="fName" />
                        <UserInputElem label="Last Name"        placeholder="Doe"                   nameAttr="lName" />
                        <UserInputElem label="Email Address"    placeholder="john.doe@gmail.com"    nameAttr="email" />
                        <UserInputElem label="Telegram"         placeholder="johnDoe_007"           nameAttr="telegram" />
                    </UserSectionCard>


                    <UserSectionCard heading="Delivery information">
                        <UserInputElem label="City"             placeholder="London"                nameAttr="fName" />
                        <UserInputElem label="District/Area"    placeholder="Downtown"              nameAttr="lName" />
                        <UserInputElem label="Address"          placeholder="37 Whitehall"          nameAttr="email" />
                        <UserInputElem label="Postal Code"      placeholder="148 80"                nameAttr="telegram" />
                    </UserSectionCard>


                    <UserSectionCard heading="Password">
                        <UserInputElem label="Current Password" placeholder="John"                  nameAttr="fName"    typeAttr="password" />
                        <UserInputElem label="New Password"     placeholder="Doe"                   nameAttr="lName"    typeAttr="password" />
                        <UserInputElem label="Confirm Password" placeholder="john.doe@gmail.com"    nameAttr="email"    typeAttr="password" />
                    </UserSectionCard>


                    <UserSectionCard heading="Log Out">
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="w-full max-w-[590px] text-base text-black font-normal leading-[120%]">
                                Lorem ipsum dolor sit amet consectetur. Non nunc est nulla urna. Cras vestibulum scelerisque volutpat eget sociis et ut morbi commodo. At feugiat non quis aliquam enim et. Posuere integer tortor elementum eu.
                            </p>

                            <button onClick={logoutClick}
                                    className="flex flex-row gap-5 hover:scale-[1.03] transition-all duration-300 ease-in-out">
                                <img src={exitIcon} />
                                <span className="text-base text-[#302929] font-medium">
                                    Exit
                                </span>
                            </button>
                        </div>
                    </UserSectionCard>


                    <Button name="Save Info" color="orange" func={buttonSubmitClick} styling="w-max mt-10 self-end" />
                </form>
            </section>
        </div>
    )
}





type TSidebarListItem = {
    icon: string,
    text: string,
}



function SidebarListItem({
    icon,
    text
} :TSidebarListItem)
{
    return (
        <li className="px-6 py-[13px] flex flex-row gap-[15px] hover:bg-[#F4F4F4] transition-all duration-300 ease-in-out cursor-pointer">
            <img src={icon} />
            <span className="text-base text-[#302929] font-medium leading-6">
                {text}
            </span>
        </li>
    )
}





type TUserInputElem = {
    label: string,
    placeholder: string,
    nameAttr: string,
    typeAttr?: string,
}



function UserInputElem({
    label,
    placeholder,
    nameAttr,
    typeAttr
} : TUserInputElem)
{
    return (
        <div className="mb-[13px] flex flex-col text-base text-[#212B36]">
            <label className="mb-[10px] font-medium">
                {label}
            </label>

            <input  name={nameAttr}
                    type={typeAttr || "text"}
                    placeholder={placeholder}
                    className="px-[18px] py-[13px] font-normal border border-[#E7E7E7] rounded-[5px] outline-none"
            />
        </div>
    )
}





type TUserSectionCard = {
    heading: string,
    children?: React.ReactNode
}



function UserSectionCard({
    heading,
    children
} : TUserSectionCard)
{
    return (
        <div className="flex flex-col mt-[30px]">
            <Heading4 styling="ms-1">{heading}</Heading4>

            <div className="mt-1 px-[30px] py-[20px] flex flex-row flex-wrap gap-x-6 border border-[#D9D9D9] rounded-[10px]">
                {children}
            </div>
        </div>
    )
}
