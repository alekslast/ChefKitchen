// React imports
import { motion } from "framer-motion";


// Custom components
import HeroSection from "./HeroSection";
import OurMenu from "./OurMenu";
import DeliveryAreas from "./DeliveryAreas";
import AdvantagesSection from "./AdvantagesSection";
import PromoSection from "./PromoSection";
import FaqSection from "./FaqSection";
import FormSection from "./FormSection";
import Footer from "./Footer";





export default function MainPage() {
    return (
        <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col justify-center items-center"
        >
            <HeroSection />

            <OurMenu />

            <DeliveryAreas />

            <AdvantagesSection />

            <PromoSection />

            <FaqSection />

            <FormSection />

            <Footer />

        </motion.div>
    )
}
