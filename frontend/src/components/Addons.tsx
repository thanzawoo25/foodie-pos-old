import { Box, Button, Paper, Typography } from "@mui/material";
import Layout from "../Layout";

import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAddonCategoryByLocationIds,
  getAddonsByLocationIds,
} from "../Utils";
import { AppContext } from "../contexts/AppContext";
import CreateAddons from "./CreateAddons";

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
  const [open, setOpen] = useState(false);

  const validAddons = getAddonsByLocationIds(addons, validAddonCategories);
  console.log("validAddons", validAddons);
  return (
    <Layout title="Addons">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addons
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {validAddons
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <Link
                key={item.id}
                to={`${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    height: 150,
                    width: 150,
                    mr: 2,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    pl: 3,
                    pb: 3,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "black" }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "black" }}>
                    {item.price} kyats
                  </Typography>
                </Paper>
              </Link>
            ))}
        </Box>
      </Box>
      <CreateAddons open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Addons;
