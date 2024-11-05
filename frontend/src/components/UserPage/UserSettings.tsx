// Custom components
import Button                   from    "../common/Button"
import { useEffect, useState }  from    "react";


// Constants
// import { userSettings_Sidebar } from    "../../lib/constants";


// Custom components
import Heading4                 from    "../common/Heading4";
import UserSectionCard          from    "./UserSectionCard";
import UserInputElem            from    "./UserInputElem";



// Images
import exitIcon                 from    "../../assets/icons/UserSettings/user-settings-logOut.svg";
import bonusIcon                from    "../../assets/icons/UserSettings/user-settings-bonuses.svg";
import { useGetUserInfo }       from    "../../lib/hooks";
import { TUserInfo }            from    "../../lib/types";





type TFormData = {
    accountInfo: {
        fName: string;
        lName: string;
        email: string;
        telegram: string;
    };
    deliveryInfo: {
        city: string;
        // district: string;
        street: string;
        postalCode: string;
    };
    passwordInfo: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    [key: string]: {
        [key: string]: string;
    };
};





export default function UserSettings() {

    const { userInfo } = useGetUserInfo();


    const logoutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    }

    const buttonSubmitClick = () => {

    }


    const [formData, setFormData] = useState<TFormData>({
        accountInfo: {
            fName: userInfo ? userInfo.name.split(" ")[0] : "",
            lName: userInfo ? userInfo.name.split(" ")[1] : "",
            email: userInfo?.email ?? "",
            telegram: userInfo?.telegram ?? "",
        },
        deliveryInfo: {
            city: userInfo?.city ?? "",
            // district: userInfo?. ?? "",
            street: userInfo?.street ?? "",
            postalCode: userInfo?.postalCode ?? "",
        },
        passwordInfo: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });



    const mapUserInfoToFormData = (userInfo: TUserInfo): TFormData => {
        return {
            accountInfo: {
                fName: userInfo.name.split(' ')[0] || '',
                lName: userInfo.name.split(' ')[1] || '',
                email: userInfo.email,
                telegram: userInfo.telegram
            },
            deliveryInfo: {
                city: userInfo.city,
                street: userInfo.street,
                postalCode: userInfo.postalCode
            },
            passwordInfo: {
                currentPassword: userInfo.password,
                newPassword: '',
                confirmPassword: ''
            }
        };
    };



    useEffect(() => {
        if (userInfo) {
            const mappedFormData = mapUserInfoToFormData(userInfo);
            setFormData(mappedFormData);
        }
    }, [userInfo]);


    
    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: value
            }
        }));
    };


    return (
        // <div className="w-full max-w-[1200px] pt-[77px] pb-16 flex flex-row justify-between items-start gap-[102px]">

        //     <aside className="pt-[30px] pb-[50px] rounded-[10px] shadow-[0_0_15px_0_rgba(0,0,0,.18)]">
        //         <ul className="w-max">
        //             {userSettings_Sidebar.map((item) => (
        //                 <SidebarListItem key={item.text} icon={item.icon} text={item.text} />
        //             ))}
        //         </ul>
        //     </aside>



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
                                    {userInfo ? userInfo.bonuses : 22} bonuses
                                </span>
                            </div>

                            <span className="text-sm text-[#637381] font-medium leading-5">
                                You can spend your bonuses on vatious things
                            </span>
                        </div>
                    </div>


                    <UserSectionCard heading="Account Info">
                        <UserInputElem label="First Name"       placeholder="John"                  nameAttr="fName"            valueAttr={formData.accountInfo.fName}              onChange={(e) => handleInputChange("accountInfo", "fName", e.target.value)} />
                        <UserInputElem label="Last Name"        placeholder="Doe"                   nameAttr="lName"            valueAttr={formData.accountInfo.lName}              onChange={(e) => handleInputChange("accountInfo", "lName", e.target.value)} />
                        <UserInputElem label="Email Address"    placeholder="john.doe@gmail.com"    nameAttr="email"            valueAttr={formData.accountInfo.email}              onChange={(e) => handleInputChange("accountInfo", "email", e.target.value)} />
                        <UserInputElem label="Telegram"         placeholder="johnDoe_007"           nameAttr="telegram"         valueAttr={formData.accountInfo.telegram}           onChange={(e) => handleInputChange("accountInfo", "telegram", e.target.value)} />
                    </UserSectionCard>


                    <UserSectionCard heading="Delivery information">
                        <UserInputElem label="City"             placeholder="London"                nameAttr="city"             valueAttr={formData.deliveryInfo.city}              onChange={(e) => handleInputChange("deliveryInfo", "city", e.target.value)} />
                        <UserInputElem label="Street"           placeholder="37 Whitehall"          nameAttr="street"           valueAttr={formData.deliveryInfo.street}            onChange={(e) => handleInputChange("deliveryInfo", "street", e.target.value)} />
                        <UserInputElem label="Postal Code"      placeholder="148 80"                nameAttr="postalCode"       valueAttr={formData.deliveryInfo.postalCode}        onChange={(e) => handleInputChange("deliveryInfo", "postalCode", e.target.value)} />
                        {/* <UserInputElem label="District/Area"    placeholder="Downtown"              nameAttr="lName" /> */}
                    </UserSectionCard>


                    <UserSectionCard heading="Password">
                        <UserInputElem label="Current Password" typeAttr="password"                 nameAttr="currentPassword"  valueAttr={formData.passwordInfo.currentPassword}   onChange={(e) => handleInputChange("passwordInfo", "currentPassword", e.target.value)} />
                        <UserInputElem label="New Password"     typeAttr="password"                 nameAttr="newPassword"      valueAttr={formData.passwordInfo.newPassword}       onChange={(e) => handleInputChange("passwordInfo", "newPassword", e.target.value)} />
                        <UserInputElem label="Confirm Password" typeAttr="password"                 nameAttr="confirmPassword"  valueAttr={formData.passwordInfo.confirmPassword}   onChange={(e) => handleInputChange("passwordInfo", "confirmPassword", e.target.value)} />
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
        // </div>
    )
}






