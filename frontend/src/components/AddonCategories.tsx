import NavBar from "./NavBar";
import Layout from "../Layout";
import { Box, Typography } from "@mui/material";
import Autocomplete from "./Autocomplete";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoryByLocationIds } from "../Utils";

const AddonCategories = () => {
  const { addonCategories, menuAddonCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);

  const validAddonCategories = getAddonCategoryByLocationIds(
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box
        sx={{
          pl: 3,
          pt: 5,
          display: "flex",
        }}
      >
        {validAddonCategories.map((item) => {
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

export default AddonCategories;
function getAddonCategoriesByLocationIds(
  addonCategories: import("../typings/types").AddonCategory[],
  menuAddonCategories: import("../typings/types").MenuAddonCategory[],
  menusMenuCategoriesLocations: import("../typings/types").MenusMenuCategoriesLocations[]
) {
  throw new Error("Function not implemented.");
}
