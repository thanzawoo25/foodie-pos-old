import { createContext, useEffect, useState } from "react";
import {
    Addon,
    AddonCategory,
    Menu,
    MenuCategory,
    Location,
    MenuLocation,
    Company
} from "../typings/types";
import { config } from "../config/config";


interface AppContextType{
    menus: Menu[];
    menuCategories: MenuCategory[];
    addons: Addon[];
    addonCategories: AddonCategory[];
    locations: Location[];
    menuLocations: MenuLocation[];
    company: Company | null;
    updateData: (value: any) => void;
    fetchData:()=>void;
    
}

export const defaultContext: AppContextType ={
    menus: [],
    menuCategories: [],
    addons: [],
    addonCategories: [],
    locations: [],
    menuLocations: [],
    company:null,
    updateData:() => { },
        fetchData:()=>{}
    
}

export const AppContext = createContext<AppContextType>(defaultContext)


const AppProvider = (props: any) => {
    const [data, updateData] = useState(defaultContext);
    const accessToken = localStorage.getItem("accessToken");
    console.log("AccessToken", accessToken)
    
    useEffect(() => {
        if (accessToken) {
            fetchData()
        }
    },[accessToken])

    const fetchData =async () => {
        console.log(config)
        const response = await fetch(`${config.apiBaseUrl}`, {
            headers: {
                Authorization:`Bearer ${accessToken}`
            }

        })
        const responseJson = await response.json()
        console.log(responseJson)
    }

    return (
        <AppContext.Provider value={{...data,updateData,fetchData}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;