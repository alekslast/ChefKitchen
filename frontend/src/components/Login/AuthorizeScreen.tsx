// React imports
import { useState }                 from    "react";
import { AnimatePresence, motion }  from    "framer-motion";


// Context
import { useLoginMethodStore }      from    "../../stores/loginMethodStore";


// Custom components
import Button                       from    "../common/Button";
import { authUser }                 from    "../../lib/hooks";



const EMAIL_AUTH_TYPE = "Email";
const PHONE_AUTH_TYPE = "Phone";





export default function AuthorizeScreen() {

    const [authMethod, setAuthMethod] = useState("");


    const { 
        phoneLogin,
        emailLogin,
        confirmPhone,
        confirmEmail,
        setEmailLogin,
        setPhoneLogin,
        setEnterCode,
        setConfirmEmail,
        setConfirmPhone } = useLoginMethodStore();



    const handleMethodChange = () => {
        document.querySelector("input")?.classList.replace("border-red-600", "border-[#E9EDF4]");

        setEmailLogin(!emailLogin);
        setConfirmEmail("");
        setPhoneLogin(!phoneLogin);
        setConfirmPhone("");
    }


    const sendEmail = async () => {
        const inputElem = document.querySelector("input");

        if (!inputElem?.value) {
            inputElem?.classList.replace("border-[#E9EDF4]", "border-red-600");
            return;
        };

        const response = await authUser(inputElem.value, EMAIL_AUTH_TYPE);

        if (response === "User not found") {
            document.querySelector(".errorSpan")?.classList.replace("hidden", "flex");
            setAuthMethod(EMAIL_AUTH_TYPE);
            return;
        }

        setEmailLogin(false);
        setPhoneLogin(false);
        setEnterCode();
    }



    const sendSms = async () => {

        const inputElem = document.querySelector("input");

        if (!inputElem?.value) {
            inputElem?.classList.replace("border-[#E9EDF4]", "border-red-600");
            return;
        };

        
        const response = await authUser(inputElem.value, PHONE_AUTH_TYPE);

        if (response === "User not found") {
            document.querySelector(".errorSpan")?.classList.replace("hidden", "flex");
            setAuthMethod(PHONE_AUTH_TYPE);
            return;
        }

        setEmailLogin(false);
        setPhoneLogin(false);
        setEnterCode();
    }



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (phoneLogin) setConfirmPhone(event.target.value);
        else            setConfirmEmail(event.target.value);

    }





    return (
        <AnimatePresence>
            <motion.form    initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-w-[400px] mt-14 flex flex-col justify-center items-center"
            >

                <span className="errorSpan hidden self-start text-sm text-red-700">
                    <span className="font-semibold">{authMethod}</span>&nbsp;is not registered
                </span>

                <input  required={true}
                        placeholder={ phoneLogin ? "Phone Number" : "E-mail" }
                        onChange={handleInputChange}
                        value={ phoneLogin ? confirmPhone : confirmEmail}
                        className="w-full py-[13px] px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />

                <span className="self-start ms-5 mt-2 mb-8 text-base text-[#ACB6BE] font-['Montserrat']">
                    Authorize&nbsp;
                    <span   onClick={handleMethodChange}
                            className="underline cursor-pointer"
                    >
                        { phoneLogin ? "with e-mail" : "with phone" }
                    </span>
                </span>


                <Button name="Send Code" func={ phoneLogin ? sendSms : sendEmail } color="green" />
                
            </motion.form>
        </AnimatePresence>
    )
}
