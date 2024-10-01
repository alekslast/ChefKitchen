

type TMenuItemCard = {
    number      :   string,
    image       :   string,
    mealType    :   string,
    mealName    :   string,
    nutrition   :   string[],
}



type TMenuItemNutritionSpan = {
    info: string,
}





export default function MenuItemCard({
    number,
    image,
    mealType,
    mealName,
    nutrition
} : TMenuItemCard)
{
    return (
        // snap-end
        <div className="relative min-w-[245px] px-4 pb-4 flex flex-col text-base bg-white rounded-xl cursor-pointer">
            <div className="absolute -top-[4%] -right-[6%] h-12 w-12 text-[24px] flex flex-col justify-center items-center text-white font-extrabold bg-Orange rounded-full">
                {number}
            </div>

            <img src={image} className="w-max" />

            <span className="text-Olive">
                {mealType}
            </span>

            <span className="max-w-[200px] my-[10px] text-black">
                {mealName}
            </span>

            <div className="flex flex-col">
                {nutrition.map(((item, index) => (
                    <MenuItemNutritionSpan key={index} info={item} />
                )))}
            </div>
        </div>
    )
}





function MenuItemNutritionSpan({ info } : TMenuItemNutritionSpan)
{
    return (
        <span className="text-xs font-light leading-[180%]">
            {info}
        </span>
    )
}
