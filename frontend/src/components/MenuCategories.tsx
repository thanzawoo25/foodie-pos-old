import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { getMenuCategoriesByLocationIds } from "../Utils";
import { AppContext } from "../contexts/AppContext";
import CreateMenuCategories from "./CreateMenuCategories";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);

  const validMenuCategories = getMenuCategoriesByLocationIds(
    menuCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new menu category
          </Button>
        </Box>
        <Box
          sx={{
            pl: 3,
            display: "flex",
          }}
        >
          {validMenuCategories.map((item) => {
            return (
              <Link
                to={`${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    border: "2px solid lightgrey",
                    borderRadius: 3,
                    borderWidth: 3,
                    borderBlockColor: "black",
                    mr: 2,
                    height: 150,
                    width: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
      <CreateMenuCategories open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default MenuCategories;
