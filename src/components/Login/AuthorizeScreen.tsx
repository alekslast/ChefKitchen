// React imports
import { AnimatePresence, motion } from "framer-motion";


// Context
import { useLoginMethodStore } from "../../stores/loginMethodStore";


// Custom components
import { Button } from "../common/Button";





export default function AuthorizeScreen() {

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



    const sendEmail = () => {
        const inputElem = document.querySelector("input");

        if (!inputElem?.value) {
            inputElem?.classList.replace("border-[#E9EDF4]", "border-red-600");
            return;
        };

        alert("Simulating Email sending");

        setEmailLogin(false);
        setPhoneLogin(false);
        setEnterCode();
    }



    const sendSms = () => {
        const inputElem = document.querySelector("input");

        if (!inputElem?.value) {
            inputElem?.classList.replace("border-[#E9EDF4]", "border-red-600");
            return;
        };

        alert("Simulating SMS sending");

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
