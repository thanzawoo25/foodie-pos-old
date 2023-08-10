import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import {
  getAccessToken,
  getLocationByMenuCategoryId,
  getMenusByMenuCategoryIds,
  getSelectedLocationId,
} from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import MenusCard from "./MenusCard";

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
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);

  if (!menuCategoryId) return null;

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
  const validMenuIds = validMenus.map((item) => item.id);

  console.log("validMenus", validMenus);

  const validLocations = getLocationByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
  const validLocationIds = validLocations.map((item) => item.id);

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
  const mappedMenus = menus
    .map((item) => ({
      id: item.id as number,
      name: `${item.name}-${item.id}`,
    }))
    .filter((item) => !validMenuIds.includes(item.id));

  const handleAddedMenuToMenuCategories = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories/addedMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId: Number(menuCategoryId),
        menuId: selectedMenuIds,
        locationIds: validLocationIds,
      }),
    });
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

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "28px", mb: 3 }}>Menus</Typography>
          <Autocomplete
            options={mappedMenus}
            label="Menus"
            placeholder="Menus"
            onChange={(options) =>
              setSelectedMenuIds(options.map((item) => item.id))
            }
          />
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleAddedMenuToMenuCategories}
          >
            Add
          </Button>
        </Box>
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
