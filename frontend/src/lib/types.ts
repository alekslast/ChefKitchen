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





export type TUserInfo = {
    id              :   number,
    name            :   string,
    email           :   string,
    phoneNumber     :   string,
    password        :   string,
    recoveryCode    :   string,
    telegram        :   string,
    country         :   string,
    city            :   string,
    street          :   string,
    postalCode      :   string,
    bonuses         :   number,
    orders          :   TUserOrders
}


export type TUserOrders = {
    Id              :   number,
    IsDelivery      :   boolean,
    Date            :   string,
    Time            :   string,
    MenuItems       :   TMenuItems
}
