// React imports
import { useRef, useState }     from    'react';


// Constants
import { meals }                from    '../../../lib/constants';
import { useMenuItems }         from    '../../../lib/hooks';


// Custom components
import Spinner                  from    '../../common/Spinner';



const ITEM_WIDTH        =   245;
const INITIAL_WIDTH     =   1120;





function MenuItemNutritionSpan({ children } : { children: React.ReactNode })
{
    return (
        <span className="text-xs font-light leading-[180%]">
            {children}
        </span>
    )
}





export default function MenuItemsSlider() {

    const { menuItems, isLoading }              =   useMenuItems();

    const [scrollPosition, setScrollPosition]   =   useState(0);
    const containerRef                          =   useRef<HTMLInputElement>(null);



    if (isLoading) {
        return <Spinner />
    }
    

    if (!menuItems) {
        return <EmptySlider />
    }


    const needToScroll                          =   (ITEM_WIDTH + 12) * menuItems.length - 12 - INITIAL_WIDTH;



    const handleScroll = (scrollAmount: number) => {
        
        const newScrollPosition = scrollPosition + scrollAmount;

        if (newScrollPosition < 0 || newScrollPosition > needToScroll + ITEM_WIDTH) {
            return;
        }
        
        setScrollPosition(newScrollPosition);
        containerRef.current!.scrollLeft = newScrollPosition;
    }





    return (
        <>
            {/* overflow-x-scroll snap-mandatory snap-x scroll-smooth */}
            <div className="relative w-full pt-5 flex flex-row">

                <div ref={containerRef} className="custom-scrollbar w-full pt-5 flex flex-row gap-3 overflow-x-scroll scroll-smooth">
                    <button onClick={() => handleScroll(-ITEM_WIDTH)} className="absolute left-0 z-10 px-[15px] py-[10px] bg-yellow-700 text-white">ScrollLeft</button>
                    <button onClick={() => handleScroll(ITEM_WIDTH)} className="absolute right-0 z-10 px-[15px] py-[10px] bg-yellow-700 text-white">ScrollRight</button>

                    {menuItems.map((item, index) => (
                        <div key={index} className="relative min-w-[245px] px-4 pb-4 flex flex-col text-base bg-white rounded-xl cursor-pointer">
                            <div className="absolute -top-[1%] -right-[2%] h-12 w-12 text-[24px] flex flex-col justify-center items-center text-white font-extrabold bg-Orange rounded-full">
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

            </div>
        </>
    )
}





function EmptySlider() {
    return (
        <div  className="relative w-full h-[150px] pt-5 flex flex-row justify-center items-center text-2xl text-white cursor-default font-semibold">
            No items so far...
        </div>
    )
}
