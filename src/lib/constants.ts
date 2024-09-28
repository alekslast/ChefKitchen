import loginImg1 from "../assets/images/Login/loginImg1.png";
import loginImg2 from "../assets/images/Login/loginImg2.png";
import loginImg3 from "../assets/images/Login/loginImg3.png";
import loginImg4 from "../assets/images/Login/loginImg4.png";
import loginImg5 from "../assets/images/Login/loginImg5.png";
import loginImg6 from "../assets/images/Login/loginImg6.png";



import protein from "../assets/icons/MainPageMenuIcons/meat.svg";
import fat from "../assets/icons/MainPageMenuIcons/flask.svg";
import sugar from "../assets/icons/MainPageMenuIcons/tomato.svg";



import meal1 from "../assets/images/MainPage/Meals/meal1.png";
import meal2 from "../assets/images/MainPage/Meals/meal2.png";
import meal3 from "../assets/images/MainPage/Meals/meal3.png";
import meal4 from "../assets/images/MainPage/Meals/meal4.png";
import meal5 from "../assets/images/MainPage/Meals/meal5.png";
import meal6 from "../assets/images/MainPage/Meals/meal6.png";





export const navItems = [
    "Menu",
    "Delivery",
    "FAQ",
    "Contacts",
]





export const loginNumberOfImgs = 6;




export const loginImages = [
    loginImg1,
    loginImg2,
    loginImg3,
    loginImg4,
    loginImg5,
    loginImg6,
]




export enum BtnColors {
    Olive       =   "olive",
    Green       =   "green",
    Orange      =   "orange",
    DarkBlue    =   "darkBlue",
    White       =   "white",
}





export const menuTypes = [
    {
        name: "POWER",
        kcal: "1800 KCAL",
    },
    {
        name: "SLIM",
        kcal: "1500 KCAL",
    },
    {
        name: "BALANCE",
        kcal: "1300 KCAL",
    },
    {
        name: "SLIM",
        kcal: "1500 KCAL",
    },
    {
        name: "BALANCE",
        kcal: "1300 KCAL",
    },
    {
        name: "SLIM",
        kcal: "1500 KCAL",
    },
    {
        name: "BALANCE",
        kcal: "1300 KCAL",
    },
]





export const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]





export const nutrition = [
    {
        image: protein,
        amount: '71',
        name: 'Protein',
    },
    {
        image: fat,
        amount: '70',
        name: 'Fat',
    },
    {
        image: sugar,
        amount: '129',
        name: 'Carbohydrates',
    },
]





export const meals = [
    {
        number: "01",
        image: meal1,
        mealType: 'BREAKFAST 1',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
    {
        number: "02",
        image: meal2,
        mealType: 'BREAKFAST 2',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
    {
        number: "03",
        image: meal3,
        mealType: 'Lunch',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
    {
        number: "04",
        image: meal4,
        mealType: 'snack',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
    {
        number: "05",
        image: meal5,
        mealType: 'DINNER',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
    {
        number: "06",
        image: meal6,
        mealType: 'DINNER',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            'Protein - 15 g',
            'Fat - 7 g',
            'Carbohydrates - 24 g',
            'Energy - 285 kсal',
            'Тotal weight: 345 g',
        ]
    },
]