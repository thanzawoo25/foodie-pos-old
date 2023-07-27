import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getMenusByLocationIds } from "../Utils";
import AddIcon from "@mui/icons-material/Add";
import NewMenus from "./NewMenus";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useContext(AppContext);
  console.log(menus);
  const [open, setOpen] = useState(false);
  const validMenus = getMenusByLocationIds(menus, menusMenuCategoriesLocations);
  return (
    <Layout title="Menus">
      <Box sx={{ mt: 3, mx: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 5 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            create new menus
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {validMenus.map((menu) => {
            return (
              <Card key={menu.id} sx={{ maxWidth: 345, mr: 3, mb: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={menu.asset_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      LThere are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        <Box
          sx={{
            ml: 5,
            mt: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {validMenus.map((menu) => {
            return (
              <Card key={menu.id} sx={{ maxWidth: 345, mr: 3, mb: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={menu.asset_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      LThere are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
        <NewMenus open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default Menus;
