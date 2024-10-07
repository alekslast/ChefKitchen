// React inputs
import { useEffect, useState }  from    "react";


// Types
import { TMenuItems }           from    "./types";





export function useMenuItems() {

    const [menuItems, setMenuItems]             =   useState<TMenuItems[]>([]);
    const [isLoading, setIsLoading]             =   useState(false);



    useEffect(() => {
        setIsLoading(true);

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
                setIsLoading(false);
            });
    }, []);



    return [ menuItems, isLoading ] as const;
}