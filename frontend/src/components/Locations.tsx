import { Box, Button, Paper } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { AppContext } from "../contexts/AppContext";
import CreateLocations from "./CreateLocations";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  // console.log(locations)

  const [open, setOpen] = useState(false);

  return (
    <Layout title="Locations">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create new location
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 5,
          }}
        >
          {locations.map((location) => (
            <Link
              to={`/locations/${location.id}`}
              key={location.id}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Paper
                elevation={2}
                sx={{
                  width: 150,
                  mr: 2,
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  mb: 2,
                }}
              >
                {location.name}.
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateLocations open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;
