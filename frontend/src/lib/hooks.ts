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





const authEmail = async (email: string) => {
    const response = await fetch(
        BASE_URL + `/Users/AuthEmail/${email}`,
        { method: "GET" }
    );


    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
    }


    const data      =   await response.json();
    return data;
}



export function useAuthWithEmail(email: string) {

    const { data, isLoading } = useQuery({
        queryKey: ["auth-email", email],
        queryFn : () => (email ? authEmail(email) : null)
    });


    if (!data) return undefined;
    
    
    return { data, isLoading } as const;
}