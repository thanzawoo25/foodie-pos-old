import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getLocationByMenuCategoryId } from "../Utils";
import Autocomplete from "./Autocomplete";

const EditMenuCategories = () => {
  const { menuCategories, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const [newMenuCategory, setNewMenuCategory] = useState({ name: "" });
  const params = useParams();
  console.log("params", params);
  const menuCategoryId = params.id as string;
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

  const updateMenuCategory = () => {
    console.log("menuCategories", menuCategories);
    console.log("setNewMenuCategory", newMenuCategory);
  };

  return (
    <Layout title="Edit Menu Categories">
      <Box sx={{ p: 5 }}>
        <TextField
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
          onChange={() => {}}
        />

        <Button variant="contained" sx={{ mt: 5 }} onClick={updateMenuCategory}>
          Update
        </Button>
      </Box>
    </Layout>
  );
};
export default EditMenuCategories;
