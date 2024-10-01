// React imports
import { HashLink }     from    "react-router-hash-link";
import { Link }         from    "react-router-dom";


// Images
import logo             from    "../../assets/images/footerLogo.svg";
import footerPicFront   from    "../../assets/images/MainPage/footerPicFront.png";
import footerPicBack    from    "../../assets/images/MainPage/footerPicBack.png";
import emailIcon        from    "../../assets/icons/Footer/emailIcon.svg";
import facebookIcon     from    "../../assets/icons/Footer/facebookIcon.svg";
import instaIcon        from    "../../assets/icons/Footer/instaIcon.svg";
import locationIcon     from    "../../assets/icons/Footer/locationIcon.svg";
import phoneIcon        from    "../../assets/icons/Footer/phoneIcon.svg";
import telegramIcon     from    "../../assets/icons/Footer/telegramIcon.svg";





export default function Footer() {

    const date = new Date().getFullYear();





    return (
        <footer className="relative w-full h-[300px] pt-16 flex flex-row justify-center items-center bg-Olive">
            <div className="w-[1200px] h-full flex flex-row justify-between items-start">

                <img src={footerPicFront} className="absolute -top-[40%] -right-[10.3%]" />
                <img src={footerPicBack} className="absolute -top-[55%] -right-[6.3%] -z-10" />

                <div className="w-1/4 h-full flex flex-col justify-start items-start gap-10">
                    <HashLink to="/">
                        <img src={logo} />
                    </HashLink>

                    <div className="w-full flex flex-row gap-7">
                        <a href="https://www.facebook.com" target="_blank">
                            <img src={telegramIcon} />
                        </a>
                        
                        <a href="https://www.instagram.com" target="_blank">
                            <img src={instaIcon} />
                        </a>
                        
                        <a href="https://www.facebook.com" target="_blank">
                            <img src={facebookIcon} />
                        </a>

                    </div>
                    
                    <span className="text-base text-white font-light leading-[150%]">
                        &copy; Chef Kitchen {date}
                    </span>
                </div>

                <div className="w-1/4 flex flex-row justify-start items-start gap-8">
                    <ul className="flex flex-col text-base text-white font-medium">
                        <li className="mb-[18px]">
                            <HashLink to="/#menu">
                                Menu
                            </HashLink>
                        </li>

                        <li className="mb-[18px]">
                            <HashLink to="/#delivery">
                                Delivery
                            </HashLink>
                        </li>

                        <li className="mb-[18px]">
                            <HashLink to="/#faqSection">
                                FAQ
                            </HashLink>
                        </li>

                        <li className="mb-[18px]">
                            <HashLink to="/#formSection">
                                Contacts
                            </HashLink>
                        </li>
                    </ul>

                    <ul className="flex flex-col text-base text-white font-light">
                        <li className="mb-[18px]">
                            <Link to="/policy">
                                Privacy Policy
                            </Link>
                        </li>

                        <li className="mb-[18px]">
                            <Link to="/terms">
                                Terms and Conditions
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="relative w-1/4 flex flex-col text-base text-white font-bold leading-[150%]">
                    <div className="flex flex-row gap-5">
                        <img src={locationIcon} />
                        
                        <span>
                            Tbilisi, Georgia
                        </span>
                    </div>

                    <div className="flex flex-row gap-5">
                        <img src={phoneIcon} />
                        
                        <span>
                            591902883 (9:00 - 18:00)
                        </span>
                    </div>

                    <div className="flex flex-row gap-5">
                        <img src={emailIcon} />
                        
                        <span>
                            info@chef-kitchen.com
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    )
}
