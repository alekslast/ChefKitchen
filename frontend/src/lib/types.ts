export type TMenuItems = {
    mealType    :   string,
    mealName    :   string,
    protein     :   number,
    fats        :   number,
    carbs       :   number,
    energy      :   number,
    totalWeight :   number
}




export type TUser = {
    id          :   number,
    firstName   :   string,
    lastName    :   string,
    password    :   string,
    email       :   string,
    phoneNumber :   string,
    telegram    :   string,
    country     :   string,
    city        :   string,
    street      :   string,
    postalCode  :   string,
    orders?     :   TOrder
}





export type TOrder = {
    id          :   number,
    isDelivery  :   boolean,
    date        :   string,
    time        :   string,
    userId      :   number,
    user        :   TUser,
    menuItems   :   TMenuItems
}
