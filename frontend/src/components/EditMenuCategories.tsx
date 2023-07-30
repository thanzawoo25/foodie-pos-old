import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAccessToken,
  getLocationByMenuCategoryId,
  getMenusByMenuCategoryIds,
  getSelectedLocationId,
} from "../Utils";
import Autocomplete from "./Autocomplete";
import { config } from "../config/config";
import MenusCard from "./MenusCard";
import { access, ftruncate } from "fs";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import { Menu } from "../typings/types";

const EditMenuCategories = () => {
  const {
    menuCategories,
    menus,
    locations,
    menusMenuCategoriesLocations,
    fetchData,
  } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();

  const menuCategoryId = params.id as string;

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });
  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [openDeleteDialogMenuCategories, setOpenDeleteDialogMenuCategories] =
    useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const selectedLocationId = getSelectedLocationId();

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
    accessToken && fetchData();
    navigate("/menu-categories");
  };

  const handleRemovedMenusFromMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/removedMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId: selectedMenu?.id,
        menuCategoryId,
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData();
    navigate("/menu-categories");
  };

  const handleDeleteMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/${menuCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData();
    navigate("/menu-categories");
  };

  return (
    <Layout title="Edit Menu Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ mb: 3 }}
            onClick={() => setOpenDeleteDialogMenuCategories(true)}
          >
            Delete
          </Button>
        </Box>
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
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((item) => {
            return (
              <Box
                key={item.id}
                sx={{
                  mr: 3,
                  mb: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <MenusCard menu={item} />
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setOpen(true);
                    setSelectedMenu(item);
                  }}
                >
                  Remove
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
      <DeleteDialog
        title={
          "Are you sure you want to removed this menu from the menu categories?"
        }
        open={open}
        setOpen={setOpen}
        callback={handleRemovedMenusFromMenuCategories}
      />
      <DeleteDialog
        title={"Are you sure you want to delete this  menu categories?"}
        open={openDeleteDialogMenuCategories}
        setOpen={setOpenDeleteDialogMenuCategories}
        callback={handleDeleteMenuCategories}
      />
    </Layout>
  );
};
export default EditMenuCategories;
