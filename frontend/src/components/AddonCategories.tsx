import NavBar from "./NavBar";
import Layout from "../Layout";
import { Box, Button, Paper, Typography } from "@mui/material";
import Autocomplete from "./Autocomplete";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoryByLocationIds } from "../Utils";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CreateAddonCategories from "./CreateAddonCategories";

const AddonCategories = () => {
  const {
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations,
    addons,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const validAddonCategories = getAddonCategoryByLocationIds(
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations
  );
  const getAddonCount = (addonCategorId?: number) => {
    if (!addonCategorId) return 0;
    return addons.filter((item) => item.addon_categories_id === addonCategorId)
      .length;
  };
  return (
    <Layout title="Addon Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addon categories
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {validAddonCategories
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((addonCategory) => (
              <Link
                key={addonCategory.id}
                to={`/addon-categories/${addonCategory.id}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    mr: 2,
                    height: 150,
                    width: 150,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography>{addonCategory.name}</Typography>
                  <Typography>
                    {getAddonCount(addonCategory.id)} addons
                  </Typography>
                </Paper>
              </Link>
            ))}
        </Box>
      </Box>
      <CreateAddonCategories open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default AddonCategories;
