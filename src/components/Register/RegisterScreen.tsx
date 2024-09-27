// React imports


// Custom components
import RegisterBtn from "./RegisterBtn";
import { AnimatePresence, motion } from "framer-motion";



type TInputElem = {
    name: string,
}





export default function RegisterScreen() {

    const handleSubmit = () => {
        alert("Successfully Registered!");

        window.location.href = "/";
    }

    return (
        
        <AnimatePresence>
            <motion.form    initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-w-[400px] mt-14 flex flex-col justify-center items-center"
            >
                <div>
                    <div className="flex flex-row gap-[10px]">
                        <InputElem name={"Your Name"} />
                        <InputElem name={"Your Phone"} />
                    </div>
                    <InputElem name={"Your Email"} />

                    <div className="flex flex-row gap-[10px]">
                        <InputElem name={"Code"} />
                        <button className="w-full h-max py-[13.5px] text-white bg-[#B0CC0D] rounded-[6px] hover:bg-[#8EC038] transition-all duration-200">
                            Get Code
                        </button>
                    </div>
                </div>

                <RegisterBtn name="Register" func={handleSubmit} />

            </motion.form>
        </AnimatePresence>
    )
}





function InputElem({ name } : TInputElem)
{
    return (
        <input  placeholder={name}
                className="w-full mb-[13px] px-[18px] py-[13px] bg-[#FCFDFE] border border-[#E9EDF4] rounded-[6px] text-base font-['Montserrat']" />
    )
}
