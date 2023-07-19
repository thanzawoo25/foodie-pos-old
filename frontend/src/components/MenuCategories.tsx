import NavBar from "./NavBar";
import Layout from "../Layout";
import { Box, Typography } from "@mui/material";
import Autocomplete from "./Autocomplete";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getMenuCategoriesByLocationIds } from "../Utils";
import { Link } from "react-router-dom";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);

  const validMenuCategories = getMenuCategoriesByLocationIds(
    menuCategories,
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
                  mr: 2,
                  height: 150,
                  width: 100,
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor:"pointer"
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
