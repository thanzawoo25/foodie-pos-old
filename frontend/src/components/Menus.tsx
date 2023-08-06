import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { getMenusByLocationIds } from "../Utils";
import { AppContext } from "../contexts/AppContext";
import CreateMenus from "./CreateMenus";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(AppContext);
  console.log(menus);
  const [open, setOpen] = useState(false);
  const validMenus = getMenusByLocationIds(menus, menusMenuCategoriesLocations);

  return (
    <Layout title="Menus">
      <Box sx={{ p: 5 }}>
        <Box sx={{ mx: 3, display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new menu
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {validMenus.map((menu) => (
            <Link
              key={menu.id}
              to={`${menu.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Card sx={{ maxWidth: 345, mr: 3, mb: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{ width: 300 }}
                    image={menu.asset_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateMenus open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;
