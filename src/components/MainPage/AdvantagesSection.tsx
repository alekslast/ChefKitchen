// Constants
import { advantages } from "../../lib/constants";


// Custom components
import Heading2 from "../common/Heading2";



// type TAdvantagesList = {
//     image: string,
//     textBold: string,
//     textRegular: string,
// }


export default function AdvantagesSection() {
    return (
        <section className="max-w-[1200px] w-full mb-[68px]">
            <Heading2>our advantages</Heading2>

            <AdvantagesList />
        </section>
    )
}





function AdvantagesList() 
{
    return (
        <div className="w-full mt-10 flex flex-row gap-[68px]">
            {advantages.map((advantage, index) => (
                <div key={index} className="w-full flex flex-col justify-center items-center">
                    <div className="w-[83px] h-[83px] mb-3 flex flex-col justify-center items-center rounded-full bg-Olive">
                        <img src={advantage.image} />
                    </div>

                    <span className="text-base text-center leading-[120%]">
                        <span className="font-bold leading-[120%]">
                            {advantage.textBold}
                        </span>
                        <br />
                        {advantage.textRegular}
                    </span>
                </div>
            ))}
        </div>
    )
}
