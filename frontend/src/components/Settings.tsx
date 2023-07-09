import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import NavBar from "./NavBar";
import Layout from "../Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Locations from "./Locations";

const Settings = () => {
  const { company, locations } = useContext(AppContext);
  console.log("company", company);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationFromLocalStorage = localStorage.getItem("selectLocationId");
      if (locationFromLocalStorage) {
        setSelectedLocationId(locationFromLocalStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
        localStorage.setItem("selectLocationId", firstLocationId);
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectLocationId", locationId);
  };
  return (
    <Layout title="Settings">
      <Box sx={{ p: 5 }}>
        <TextField label="Company Name" defaultValue={company?.name} />
        <Box sx={{ minWidth: 120, mt: 5, width: "300px" }}>
          <FormControl fullWidth>
            <InputLabel>Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;
