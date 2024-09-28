// React imports
import { motion } from "framer-motion";


// Custom components
import HeroSection from "./HeroSection";
import OurMenu from "./OurMenu";





export default function MainPage() {
    return (
        <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col"
        >
            <HeroSection />

            <OurMenu />
        </motion.div>
    )
}
