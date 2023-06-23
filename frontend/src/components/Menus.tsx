import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Layout from "../Layout";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";


const Menus = () => {
  const {menus} = useContext(AppContext)
  console.log(menus)
  const sampleMenuImageUrl =
    "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/Spicy%20seasoned%20seafood%20noodles.png";
    return (
        <Layout title="Menus">
        
        <Box sx={{ml:5,mt:5,display:"flex",alignItems:"center"}}>
          {menus.map((menu) => {
          return (
            <Card key={menu.id} sx={{ maxWidth: 345,mr:3 }}>
              
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={sampleMenuImageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            LThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          )
        })}
        </Box>
        </Layout >
    )
}

export default Menus;