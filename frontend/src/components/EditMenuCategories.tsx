import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAccessToken,
  getLocationByMenuCategoryId,
  getMenusByMenuCategoryIds,
} from "../Utils";
import Autocomplete from "./Autocomplete";
import { config } from "../config/config";
import MenusCard from "./MenusCard";

const EditMenuCategories = () => {
  const { menuCategories, menus, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const params = useParams();

  const menuCategoryId = params.id as string;

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  const accessToken = getAccessToken();

  if (!menuCategoryId) return null;
  console.log("menuCategoryId", menuCategoryId);

  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  console.log("menuCategory", menuCategory);
  if (!menuCategory)
    return (
      <Layout title="EditMenuCategories">
        <Box sx={{ p: 5 }}>
          <Typography>Menu categories not found.</Typography>
        </Box>
      </Layout>
    );

  const validMenus = getMenusByMenuCategoryIds(
    menus,
    menuCategoryId,
    menusMenuCategoriesLocations
  );

  console.log("validMenus", validMenus);

  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
  };

  return (
    <Layout title="Edit Menu Categories">
      <Box sx={{ p: 5 }}>
        <TextField
          sx={{ mb: 5 }}
          defaultValue={menuCategory.name}
          onChange={(event) =>
            setNewMenuCategory({ ...newMenuCategory, name: event.target.value })
          }
        />
        <Autocomplete
          options={mappedLocations}
          defaultValue={mappedValidLocations}
          label="Locations"
          placeholder="Locations"
          onChange={(options) =>
            setNewMenuCategory({
              ...newMenuCategory,
              locationIds: options.map((item) => item.id),
            })
          }
        />
        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5 }}
          onClick={updateMenuCategory}
        >
          Update
        </Button>
        <Box>
          {validMenus.map((item) => {
            return (
              <Box key={item.id}>
                <MenusCard menu={item} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};
export default EditMenuCategories;
