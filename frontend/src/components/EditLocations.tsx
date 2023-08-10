import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { getAccessToken } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Location } from "../typings/types";
import DeleteDialog from "./DeleteDialog";

const EditLocations = () => {
  const params = useParams();
  const navigate = useNavigate();
  const locationId = params.id as string;
  const { locations, fetchData } = useContext(AppContext);

  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<Location>();

  const updateLocation = async () => {
    const isValid = location?.name && location.address;
    if (!isValid) return alert("Name and address are required.");
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    accessToken && fetchData();
    navigate("/locations");
  };
  const handleDeleteLocations = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/locations");
  };
  useEffect(() => {
    if (locations.length) {
      const validLcation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLcation);
    }
  }, [location]);

  if (!location) return null;
  return (
    <Layout title="Edit Addons">
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ mb: 3 }}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={location.name}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setLocation({ ...location, name: event.target.value })
            }
          />
          <TextField
            defaultValue={location.address}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setLocation({ ...location, address: event.target.value })
            }
          />

          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={updateLocation}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title={"Are you sure you want to delete this location"}
          open={open}
          setOpen={setOpen}
          callback={handleDeleteLocations}
        />
      </Box>
    </Layout>
  );
};
export default EditLocations;
