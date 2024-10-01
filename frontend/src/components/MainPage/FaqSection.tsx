// Constants
import { faqCards, questionList } from "../../lib/constants";


// Custom components
import Heading2 from "../common/Heading2";
import { useEffect, useState } from "react";





export default function FaqSection() {
    return (
        <section id="faqSection" className="max-w-[1200px] w-full h-max pt-[100px]">

            <Heading2>FAQ</Heading2>

            <FaqCards />

            <Answers />

        </section>
    )
}





function FaqCards() {

    return (
        <div className="mt-10 flex flex-row gap-5">
            {faqCards.map(card => (
                <div    key={card.name}
                        className={`w-[183px] h-[165px] flex flex-col justify-center items-center ${card.name === "Cashback" ? "bg-Olive" : "bg-[#F4F4F4]"} rounded-[28px] cursor-pointer`}
                >
                    <img src={card.image} />


                    <span className={`${card.name === "Cashback" ? "text-white" : "text-black"}`}>
                        {card.name}
                    </span>
                </div>
            ))}
        </div>
    )
}





type TQestionList = {
    question: string,
    answer: string,
    show: boolean,
}



function Answers() {

    const [showQ, setShowQ] = useState<TQestionList[]>();



    useEffect(() => {
        setShowQ(questionList);
    }, [])



    const questionClicked = (qName: string) => {
        setShowQ(prevValue => 
            prevValue?.map((item) => 
                item.question === qName ? { ...item, show: !item.show} : item
            )
        )
    }





    return (
        <div>
            {showQ?.map((item) => (
                <div    key={item.question}
                        onClick={() => questionClicked(item.question)}
                        className="w-full mt-[35px] pb-[35px] flex flex-col border-b-2 border-b-[#B0B0B0]"
                >
                    <h3 className={`${item.show ? "text-Olive" : "text-black"} text-[24px] font-bold cursor-pointer`}>
                        {item.question}
                    </h3>

                    <span className={`${item.show ? "h-max mt-[15px] opacity-100 z-0" : "h-0 opacity-0 -z-10 mt-0"} transition-all duration-300 `}>
                        {item.answer}
                    </span>
                </div>
            ))}
        </div>
        
    )
}