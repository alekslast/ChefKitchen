import loginImg1        from    "../assets/images/Login/loginImg1.png";
import loginImg2        from    "../assets/images/Login/loginImg2.png";
import loginImg3        from    "../assets/images/Login/loginImg3.png";
import loginImg4        from    "../assets/images/Login/loginImg4.png";
import loginImg5        from    "../assets/images/Login/loginImg5.png";
import loginImg6        from    "../assets/images/Login/loginImg6.png";



import protein          from    "../assets/icons/MainPageMenuIcons/meat.svg";
import fat              from    "../assets/icons/MainPageMenuIcons/flask.svg";
import sugar            from    "../assets/icons/MainPageMenuIcons/tomato.svg";



import meal1            from    "../assets/images/MainPage/Meals/meal1.png";
import meal2            from    "../assets/images/MainPage/Meals/meal2.png";
import meal3            from    "../assets/images/MainPage/Meals/meal3.png";
import meal4            from    "../assets/images/MainPage/Meals/meal4.png";
import meal5            from    "../assets/images/MainPage/Meals/meal5.png";
import meal6            from    "../assets/images/MainPage/Meals/meal6.png";



import advantage1       from    "../assets/images/MainPage/Advantages/advantage1.svg";
import advantage2       from    "../assets/images/MainPage/Advantages/advantage2.svg";
import advantage3       from    "../assets/images/MainPage/Advantages/advantage3.svg";
import advantage4       from    "../assets/images/MainPage/Advantages/advantage4.svg";
import advantage5       from    "../assets/images/MainPage/Advantages/advantage5.svg";



import faqCash          from    "../assets/images/MainPage/FAQ/cash.svg";
import faqWeight        from    "../assets/images/MainPage/FAQ/weight.svg";
import faqProducts      from    "../assets/images/MainPage/FAQ/products.svg";
import faqRates         from    "../assets/images/MainPage/FAQ/rates.svg";
import faqPayment       from    "../assets/images/MainPage/FAQ/payment.svg";
import faqStorage       from    "..//assets/images/MainPage/FAQ/storage.svg";



import menuIcon         from    "../assets/icons/UserSettings/sidebar-menu.svg";
import orderIcon        from    "../assets/icons/UserSettings/sidebar-order.svg";
import deliveryIcon     from    "../assets/icons/UserSettings/sidebar-delivery.svg";
import gearIcon         from    "../assets/icons/UserSettings/settings-gear.svg";





export const BASE_URL = "https://localhost:44338";





export const navItems = [
    {
        text: "Menu",
        link: "/home#menu"
    },
    {
        text: "Delivery",
        link: "/home#delivery"
    },
    {
        text: "FAQ",
        link: "/home#faqSection"
    },
    {
        text: "Contacts",
        link: "/home#formSection"
    },
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
        amount: "71",
        name: "Protein",
    },
    {
        image: fat,
        amount: "70",
        name: "Fat",
    },
    {
        image: sugar,
        amount: "129",
        name: "Carbohydrates",
    },
]





export const meals = [
    {
        number: "01",
        image: meal1,
        mealType: "BREAKFAST 1",
        mealName: "Chicken fricassee with mushrooms and bulgur",
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
    {
        number: "02",
        image: meal2,
        mealType: 'BREAKFAST 2',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
    {
        number: "03",
        image: meal3,
        mealType: 'LUNCH',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
    {
        number: "04",
        image: meal4,
        mealType: 'SNACK',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
    {
        number: "05",
        image: meal5,
        mealType: 'DINNER 1',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
    {
        number: "06",
        image: meal6,
        mealType: 'DINNER 2',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        nutrition: [
            "Protein - 15 g",
            "Fat - 7 g",
            "Carbohydrates - 24 g",
            "Energy - 285 kсal",
            "Тotal weight: 345 g",
        ]
    },
]





export const mealsDummy = [
    {
        mealType: 'BREAKFAST 1',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
    {
        mealType: 'BREAKFAST 2',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
    {
        mealType: 'LUNCH',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
    {
        mealType: 'SNACK',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
    {
        mealType: 'DINNER 1',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
        protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
    {
        mealType: 'DINNER 2',
        mealName: 'Chicken fricassee with mushrooms and bulgur',
            protein: 15,
        fats: 7,
        carbs: 24,
        energy: 285,
        totalWeight: 345,
    },
]





export const advantages = [
    {
        image: advantage1,
        textBold: "We'll deliver it free of charge",
        textRegular: "In a convenient 2-hour interval",
    },
    {
        image: advantage2,
        textBold: "We'll calculate calories",
        textRegular: "It will be easy for you to control your diet",
    },
    {
        image: advantage3,
        textBold: "We'll help you to save up to 20 hours ",
        textRegular: "of free time a week for you",
    },
    {
        image: advantage4,
        textBold: "Everything is ready, just warm it up",
        textRegular: "We’ll bring you ready-made dishes",
    },
    {
        image: advantage5,
        textBold: "We''l help you with your diet menu",
        textRegular: "Lots of options for various programs",
    },
]





export const faqCards = [
    {
        image: faqCash,
        name: "Cashback",
    },
    {
        image: faqWeight,
        name: "Weight Loss",
    },
    {
        image: faqProducts,
        name: "Products",
    },
    {
        image: faqRates,
        name: "Rates",
    },
    {
        image: faqPayment,
        name: "Payment",
    },
    {
        image: faqStorage,
        name: "Storage",
    },
]





export const questionList = [
    {
        question: "What is cashback?",
        answer: "Make orders, take part in promotions, recommend us to friends or connect a family tariff. We will refund up to 50% of the order value.",
        show: false,
    },
    {
        question: "How to get cashback?",
        answer: "Make orders, take part in promotions, recommend us to friends or connect a family tariff. We will refund up to 50% of the order value.",
        show: false,
    },
    {
        question: "Why can I only spend part of the cashback?",
        answer: "Make orders, take part in promotions, recommend us to friends or connect a family tariff. We will refund up to 50% of the order value.",
        show: false,
    },
    {
        question: "Where can I see how many bonus rubles I have in my account?",
        answer: "Make orders, take part in promotions, recommend us to friends or connect a family tariff. We will refund up to 50% of the order value.",
        show: false,
    },
    {
        question: "What can I spend cashback on?",
        answer: "Make orders, take part in promotions, recommend us to friends or connect a family tariff. We will refund up to 50% of the order value.",
        show: false,
    },
]





export const userSettings_Sidebar = [
    {
        icon: menuIcon,
        text: "Menus"
    },
    {
        icon: orderIcon,
        text: "Orders"
    },
    {
        icon: deliveryIcon,
        text: "Deliveries"
    },
    {
        icon: gearIcon,
        text: "Settings"
    },
    // {
    //     icon: ,
    //     text: ""
    // },
]