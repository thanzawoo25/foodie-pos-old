interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  description?: string;
  asset_url?: string;
  is_available?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  id: number;
  price: number;
  is_available: boolean;
  addon_categories_id: number;
}

export interface AddonCategory extends BaseType {
  is_required: boolean;
}

export interface Location extends BaseType {
  companyId?: string;
  address?: string;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}

export interface Tables extends BaseType {
  locations_id: number;
}
export interface MenusMenuCategoriesLocations {
  id: number;
  menus_id: number;
  menu_categories_id: number;
  locations_id: number;
}

export interface MenuAddonCategory {
  id: number;
  menus_id: number;
  addon_categories_id: number;
}
