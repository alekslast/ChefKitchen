import { sumUpItem } from "../../lib/constants"





export default function SumUpCard() {
    return (
        <div className="w-full h-[232px] max-w-[180px] px-[14px] pt-[12px] pb-[18px] flex flex-col justify-center items-start text-[17px] leading-[100%] border border-[#CECECE] rounded-[10px] transition-all duration-300 ease-in-out">
            <span className="font-medium">
                Total on Tuesday:
            </span>

            <span className="text-Orange font-semibold">
                {} kcal
            </span>

            <span className="mt-[10px] mb-[20px] font-bold">
                {} meals
            </span>

            <div className="flex flex-col gap-[14px]">
                
                {sumUpItem.map((item) => (
                    <SumUpItem key={item.name} image={item.image} amount={item.amount} name={item.name}/>
                ))}
            </div>
        </div>
    )
}





type TSumUpItem = {
    image   :   string,
    amount  :   number,
    name    :   string,
}



function SumUpItem({
    image,
    amount,
    name
} : TSumUpItem)
{
    return (
        <div className="w-full h-max flex flex-row items-center gap-[18px]">
            <img src={image} className="h-[27px]" />

            <span className="text-sm font-medium">
                <span className="text-xl font-semibold">{amount}</span>&nbsp;{name}
            </span>
        </div>
    )
}
