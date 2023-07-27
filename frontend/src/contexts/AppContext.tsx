import { createContext, useEffect, useState } from "react";
import {
  Addon,
  AddonCategory,
  Menu,
  MenuCategory,
  Location,
  Company,
  Tables,
  MenusMenuCategoriesLocations,
  MenuAddonCategory,
} from "../typings/types";
import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menuAddonCategories: MenuAddonCategory[];
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[];
  company: Company | null;
  tables: Tables[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuAddonCategories: [],
  menusMenuCategoriesLocations: [],
  company: null,
  tables: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);
  console.log("data", data);

  const fetchData = async () => {
    console.log(config);
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();

    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
