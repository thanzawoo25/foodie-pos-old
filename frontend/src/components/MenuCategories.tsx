import NavBar from "./NavBar";
import Layout from "../Layout";
import { Box } from "@mui/material";
import Autocomplete from "./Autocomplete";

const MenuCategories = () => {
  const textMenu = [
    { id: 36, name: "mote-tee" },
    { id: 37, name: "shwe yin aye" },
    { id: 38, name: "lat phet tote" },
    { id: 39, name: "bane mote" },
  ];
  return (
    <Layout title="Menu Categories">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1>MenuCategories Bar</h1>
        <Autocomplete options={textMenu} defaultValue={textMenu} />
      </Box>
    </Layout>
  );
};

export default MenuCategories;
