import {
  Addon,
  AddonCategory,
  Location,
  Menu,
  MenuAddonCategory,
  MenuCategory,
  MenusMenuCategoriesLocations,
} from "../typings/types";

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectLocationId");
};
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getMenuCategoriesByLocationIds = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectLocationId = getSelectedLocationId();

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};

export const getMenusByLocationIds = (
  menus: Menu[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const getAddonCategoryByLocationIds = (
  addonCategories: AddonCategory[],
  menuAddonCategories: MenuAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectLocationId)
    )
    .map((item) => item.menus_id);
  const validAddonCategoryIds = menuAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};

export const getAddonsByLocationIds = (
  addons: Addon[],
  addonCategories: AddonCategory[]
) => {
  const validAddonCategoryIds = addonCategories.map((item) => item.id);
  console.log("validAddonCategoryIds", validAddonCategoryIds);
  console.log("addons", addons);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_categories_id)
  );
};

export const getLocationByMenuCategoryId = (
  location: Location[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationId = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);
  return location.filter((item) => validLocationId.includes(item.id as number));
};
export const getAdddonCategoriesByMenuId = (
  addonCategories: AddonCategory[],
  menuAddonCategories: MenuAddonCategory[],
  menuId: string
) => {
  const validAddonCategoryIds = menuAddonCategories
    .filter((item) => item.menus_id === Number(menuId))
    .map((item) => item.addon_categories_id);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};
export const getMenusByMenuCategoryIds = (
  menus: Menu[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id &&
        item.menu_categories_id === Number(menuCategoryId) &&
        item.locations_id === Number(selectLocationId)
    )
    .map((item) => item.menus_id);
  console.log("validMenuIds", validMenuIds);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};
