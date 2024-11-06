// React inputs
import { useEffect, useState }      from    "react";
import axios, { HttpStatusCode }    from    "axios";
import { useQuery }                 from    "@tanstack/react-query";


// Types
import { TMenuItems, TUserInfo }               from    "./types";


// Constants
import { BASE_URL }                 from    "./constants";





export function useMenuItems() {

    const [menuItems, setMenuItems]             =   useState<TMenuItems[] | null>(null);
    const [isLoading, setIsLoading]             =   useState(false);


    useEffect(() => {
        setIsLoading(true);

        // fetch(BASE_URL + `/MenuItems`,
        //     {
        //         method: "GET"
        //     }
        // )
        axios.get(BASE_URL + `/MenuItems`, { withCredentials: true })
            .then(response => {
                // console.log(response.data)
                return response.data;
            })
            .then(data => {
                setMenuItems(data);
                setIsLoading(false);
            });
    }, []);


    return { menuItems, isLoading };
}





// type TUserInfo = {
//     id              :   number,
//     name            :   string,
//     email           :   string,
//     phoneNumber     :   string,
//     password        :   string,
//     recoveryCode    :   string,
//     telegram        :   string,
//     country         :   string,
//     city            :   string,
//     street          :   string,
//     postalCode      :   string,
//     bonuses         :   number,
//     orders          :   TUserOrders
// }


// type TUserOrders = {
//     Id              :   number,
//     IsDelivery      :   boolean,
//     Date            :   string,
//     Time            :   string,
//     MenuItems       :   TMenuItems
// }



export function useGetUserInfo() {

    debugger
    const [ userInfo, setUserInfo ]     =   useState<TUserInfo | null>(null);
    const [ isLoading, setIsLoading ]   =   useState(true);

    useEffect(() => {
        setIsLoading(true);


        axios.get(BASE_URL + "/Users/GetSingleUser", { withCredentials: true })
        .then(response => {
            console.log(response.data)
            return response.data;
        })
        .then(data => {
            setUserInfo(data);
            setIsLoading(false);
        })
    }, []);


    return { userInfo, isLoading };
}





// export function useMenuItemSingle(id: number) {
//     const [menuItem, setMenuItem]             =   useState<TMenuItems | null>(null);
//     const [isLoading, setIsLoading]           =   useState(false);



//     useEffect(() => {
//         setIsLoading(true);

//         fetch(BASE_URL + `/${id}`,
//             {
//                 method: "GET"
//             }
//         )
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 setMenuItem(data);
//                 setIsLoading(false);
//             });
//     }, []);


//     return { menuItem, isLoading };
// }


const fetchMenuItem = async (id: number): Promise<TMenuItems> => {
    // const response  =   await fetch(BASE_URL + `/MenuItems/${id}`);
    const response  =   await axios.get(BASE_URL + `/MenuItems/${id}`, { withCredentials: true });

    // if (!response.ok) {
    if (response.status !== HttpStatusCode.Ok) {
        const errorData = await response.data;
        throw new Error(errorData)
    }

    const data      =   await response.data;
    return data;
}


// export function useGetSingleUser(id: number | null) {

//     const { data, isLoading } = useQuery({
//         queryKey                :   ["menu-item", id],
//         queryFn                 :   () => (id ? fetchMenuItem(id) : null),
//         staleTime               :   1000 * 60 * 60,
//         refetchOnWindowFocus    :   false,
//         enabled                 :   Boolean(id)
//     });



//     if (!data) return undefined;
    
    
//     return { data, isLoading } as const;
// }





export const authUser = async (emailOrPhone: string, authMethod: string) => {

    debugger

    // const response = await fetch(
    //     BASE_URL + `/Users/Auth${authMethod}/${emailOrPhone}`,
    //     { method: "GET" }
    // );

    const response = await axios.get(BASE_URL + `/Users/Auth${authMethod}/${emailOrPhone}`, { withCredentials: true });


    if (response.status === HttpStatusCode.Ok) {

        // const errorText = await response.text();
        const errorText = await response.data();

        if (errorText === "User not found") {
            return errorText;
        }

    }
    else if (response.status != HttpStatusCode.Ok) {
        // const errorData = await response.text();
        const errorData = await response.data();
        throw new Error(errorData);
    }


    const data      =   response;
    return data;
}



export function useAuthUser(emailOrPhone: string, authMethod: string) {

    const { data, isLoading } = useQuery({
        queryKey: [`auth-${authMethod}`, emailOrPhone],
        queryFn : () => (emailOrPhone ? authUser(emailOrPhone, authMethod) : null)
    });


    if (!data) return undefined;
    
    
    return { data, isLoading } as const;
}





// type TRegisterUser = {
//     email: string,
//     phone: string,
//     name: string
// }



// export const registerUser = async ({ email, phone, name } : TRegisterUser) => {
//     const response = await fetch(
//         BASE_URL + "/Users",
//         { 
//             method  : "POST",
//             body    : JSON.stringify({  })
//         }
//     )
// }





// export const useAuthToken = () => {
//     const [token, setToken] = useState(localStorage.getItem('token'));

//     const refreshToken = async () => {

//         debugger

//         return await axios.post("https://localhost:44338/Users/RefreshToken", { withCredentials: true })
//             .then(response => {
//                 debugger
//                 console.log("At least we're here...");
//                 localStorage.setItem('token', response.data.token); // Сохраняем новый JWT токен
//                 setToken(response.data.token); // Обновляем состояние токена
//                 return response.data.token;
//             })
//             .catch(error => {
//                 debugger
//                 console.error('Error refreshing token:', error);
//                 // Логика выхода или другие действия
//             });
//     };

//     return { token, refreshToken };
// };
