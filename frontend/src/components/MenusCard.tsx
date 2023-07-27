import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menu } from "../typings/types";
import { Link } from "react-router-dom";

interface Props {
  menu: Menu;
}
const MenusCard = ({ menu }: Props) => {
  return (
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      style={{ textDecoration: "none", marginBottom: 3 }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={menu.asset_url || ""}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenusCard;
