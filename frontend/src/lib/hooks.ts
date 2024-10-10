// React inputs
import { useEffect, useState }  from    "react";
import { useQuery }             from    "@tanstack/react-query";


// Types
import { TMenuItems }           from    "./types";


// Constants
import { BASE_URL }             from    "./constants";





export function useMenuItems() {

    const [menuItems, setMenuItems]             =   useState<TMenuItems[] | null>(null);
    const [isLoading, setIsLoading]             =   useState(false);



    useEffect(() => {
        setIsLoading(true);

        fetch(BASE_URL + `/MenuItems`,
            {
                method: "GET"
            }
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMenuItems(data);
                setIsLoading(false);
            });
    }, []);



    return { menuItems, isLoading };
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
    const response  =   await fetch(BASE_URL + `/MenuItems/${id}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData)
    }

    const data      =   await response.json();
    return data;
}


export function useGetSingleUser(id: number | null) {

    const { data, isLoading } = useQuery({
        queryKey                :   ["menu-item", id],
        queryFn                 :   () => (id ? fetchMenuItem(id) : null),
        staleTime               :   1000 * 60 * 60,
        refetchOnWindowFocus    :   false,
        enabled                 :   Boolean(id)
    });



    if (!data) return undefined;
    
    
    return { data, isLoading } as const;
}





export const authUser = async (emailOrPhone: string, authMethod: string) => {

    debugger

    const response = await fetch(
        BASE_URL + `/Users/Auth${authMethod}/${emailOrPhone}`,
        { method: "GET" }
    );


    if (response.status === 404) {

        const errorText = await response.text();

        if (errorText === "User not found") {
            return errorText;
        }

    }
    else if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
    }


    const data      =   await response;
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





type TRegisterUser = {
    email: string,
    phone: string,
    name: string
}



export const registerUser = async ({ email, phone, name } : TRegisterUser) => {
    const response = await fetch(
        BASE_URL + "/Users",
        { 
            method  : "POST",
            body    : JSON.stringify({  })
        }
    )
}
