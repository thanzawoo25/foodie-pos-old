import NavBar from "./NavBar";
import Layout from "../Layout";
import { Box, Typography } from "@mui/material";
import Autocomplete from "./Autocomplete";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAddonCategoryByLocationIds,
  getAddonsByLocationIds,
} from "../Utils";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoryByLocationIds(
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations
  );

  const validAddons = getAddonsByLocationIds(addons, validAddonCategories);
  console.log("validAddons", validAddons);
  return (
    <Layout title="Addons">
      <Box
        sx={{
          pl: 3,
          pt: 5,
          display: "flex",
        }}
      >
        {validAddons.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                border: "2px solid lightgrey",
                borderRadius: 3,
                mr: 2,
                height: 150,
                width: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Addons;
