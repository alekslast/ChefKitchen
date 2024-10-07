// React imports
import { useEffect, useState }  from    'react';


// Constants
import { mealsDummy, meals }    from    '../../../lib/constants';



export type TMenuItems = {
    mealType    :   string,
    mealName    :   string,
    protein     :   number,
    fats        :   number,
    carbs       :   number,
    energy      :   number,
    totalWeight :   number
}



type TMenuItemNutritionSpan = {
    children    :   React.ReactNode,
}





export default function MenuItemsSlider() {

    const [menuItems, setMenuItems] = useState<TMenuItems[]>(mealsDummy);

    useEffect(() => {
        fetch("https://localhost:44338/MenuItems",
            {
                method: "GET"
            }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMenuItems(data);
            });
    }, []);





    return (
        <>
            {/* overflow-x-scroll snap-mandatory snap-x scroll-smooth */}
            <div className="flex flex-row gap-3">
                {menuItems.map((item, index) => (
                    <div key={index} className="relative min-w-[245px] px-4 pb-4 flex flex-col text-base bg-white rounded-xl cursor-pointer">
                        <div className="absolute -top-[4%] -right-[6%] h-12 w-12 text-[24px] flex flex-col justify-center items-center text-white font-extrabold bg-Orange rounded-full">
                            {`0${index + 1}`}
                        </div>

                        <img src={meals[index].image} className="w-max" />

                        <span className="text-Olive">
                            {item.mealType}
                        </span>

                        <span className="max-w-[200px] my-[10px] text-black">
                            {item.mealName}
                        </span>

                        <div className="flex flex-col">
                            <MenuItemNutritionSpan>{`Proteins - ${item.protein} g`}</MenuItemNutritionSpan>
                            <MenuItemNutritionSpan>{`Fats - ${item.fats} g`}</MenuItemNutritionSpan>
                            <MenuItemNutritionSpan>{`Carbohydrates - ${item.carbs} g`}</MenuItemNutritionSpan>
                            <MenuItemNutritionSpan>{`Energy - ${item.energy} kcal`}</MenuItemNutritionSpan>
                            <MenuItemNutritionSpan>{`Total Weight - ${item.totalWeight} g`}</MenuItemNutritionSpan>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}





function MenuItemNutritionSpan({ children } : TMenuItemNutritionSpan)
{
    return (
        <span className="text-xs font-light leading-[180%]">
            {children}
        </span>
    )
}
