// Constants
import { meals } from '../../lib/constants'


// Custom components
import MenuItemCard from './MenuItemCard'





export default function MenuItemsSlider() {
    return (
        <>
            {/* overflow-x-scroll snap-mandatory snap-x scroll-smooth */}
            <div className="flex flex-row gap-3">
                {meals.map((meal) => (
                    <MenuItemCard   key={meal.mealType}
                                    number={meal.number}
                                    image={meal.image}
                                    mealName={meal.mealName}
                                    mealType={meal.mealType}
                                    nutrition={meal.nutrition}
                    />
                ))}
            </div>
        </>
    )
}
