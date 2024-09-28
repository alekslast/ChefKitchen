// React imports
import { AnimatePresence, motion } from "framer-motion";


// Context
import { useLoginMethodStore } from "../../stores/loginMethodStore";


// Custom components
import { Button } from "../common/Button";





export default function ConfirmAuthorization() {

    const { confirmEmail, confirmPhone } = useLoginMethodStore();



    const handleSubmit = () => {
        const inputElem = document.querySelector("input");

        if (!inputElem?.value) {
            inputElem?.classList.replace("border-[#E9EDF4]", "border-red-600");
            return;
        };

        alert('Form has been sent to "/endpoint"');

        window.location.href = "/";
    }





    return (
        <AnimatePresence>
            <motion.form    initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-w-[400px] mt-14 flex flex-col justify-center items-center"
            >
                <div className="w-full flex flex-row justify-between items-center mb-6 font-['Montserrat'] leading-[22px]">
                    <span className="text-sm text-[#7D7D81]">
                        { confirmPhone ? "SMS" : "E-mail" } sent to
                    </span>
                    
                    <span className="text-base text-[#302929]">
                        { confirmPhone || confirmEmail }
                    </span>
                </div>

                <input  placeholder="Enter Code"
                        className="w-full mb-7 py-[13px] px-5 bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />


                <Button name="Login" func={handleSubmit} color="green" />
                
            </motion.form>
        </AnimatePresence>
    )
}
