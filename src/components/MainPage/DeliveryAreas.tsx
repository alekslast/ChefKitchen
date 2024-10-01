// Custom components
import Heading2 from "../common/Heading2";


// Images
import map from "../../assets/images/MainPage/mapPlaceholder.png";





export default function DeliveryAreas() {
    return (
        <section id="delivery" className="max-w-[1200px] w-full h-max py-[100px]">
            <Heading2>delivery areas</Heading2>

            <input placeholder="Enter your address" className="w-full my-10 py-6 px-5 text-base text-black font-normal bg-[#F4F4F4] rounded-[23px]" />
        
            <img src={map} />
        </section>
    )
}
