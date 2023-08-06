import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { getAccessToken, getAdddonCategoriesByMenuId } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";

const EditMenus = () => {
  const { menus, addonCategories, menuAddonCategories, fetchData } =
    useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  console.log("menus", menus);

  const menuId = params.id as string;

  const [menu, setMenu] = useState<Menu>();

  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [addonCategoryIds, setAddonCategoryIds] = useState<number[]>();

  useEffect(() => {
    if (menus.length) {
      const validMenu = menus.find((item) => item.id === Number(menuId));
      setMenu(validMenu);
    }
  }, [menus]);

  const validAddonCategories = getAdddonCategoriesByMenuId(
    addonCategories,
    menuAddonCategories,
    menuId
  );

  const mappedValidAddonCategories = validAddonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedAddonCategories = addonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const updateMenuCategory = async () => {
    const payload = { ...menu, addonCategoryIds };
    await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    accessToken && fetchData();
    navigate("/menus");
  };
  if (!menu)
    return (
      <Layout title="Edit Menus">
        <Box sx={{ p: 5 }}>
          <Typography>Menus not found.</Typography>
        </Box>
      </Layout>
    );

  const handleDeleteMenu = async () => {
    console.log("Hello");
    await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    navigate("/menus");
  };

  if (!menus) return null;

  return (
    <Layout title="Edit Menus">
      <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ mb: 3 }}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "500px" }}>
          <TextField
            sx={{ mb: 5 }}
            defaultValue={menu.name}
            onChange={(event) => setMenu({ ...menu, name: event.target.value })}
          />
          <TextField
            sx={{ mb: 5 }}
            defaultValue={menu.price}
            onChange={(event) =>
              setMenu({
                ...menu,
                price: Number(event.target.value),
              })
            }
          />
        </Box>

        <Autocomplete
          options={mappedAddonCategories}
          defaultValue={mappedValidAddonCategories}
          label="addon categories"
          placeholder="addon categories"
          onChange={(options) =>
            setAddonCategoryIds(options.map((item) => item.id))
          }
        />
        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5, width: "fit-content" }}
          onClick={updateMenuCategory}
        >
          Update
        </Button>
      </Box>

      <DeleteDialog
        title={"Are you sure you want to delete this  menu?"}
        open={open}
        setOpen={setOpen}
        callback={handleDeleteMenu}
      />
    </Layout>
  );
};
export default EditMenus;
