// React imports
import { AnimatePresence, motion } from "framer-motion";


// Context
import { useLoginMethodStore } from "../../stores/loginMethodStore";


// Custom components
import DefaultScreen from "./DefaultScreen";
import AuthorizeScreen from "./AuthorizeScreen";
import ConfirmAuthorization from "./ConfirmAuthorization";





export default function Login() {

    const { 
        phoneLogin,
        emailLogin,
        enterCode } = useLoginMethodStore();





    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
            >
                { phoneLogin || emailLogin || enterCode || <DefaultScreen /> }
                { (phoneLogin || emailLogin) && !enterCode && <AuthorizeScreen /> }
                { (enterCode) && <ConfirmAuthorization /> }
            </motion.div>
        </AnimatePresence>
    )
}
