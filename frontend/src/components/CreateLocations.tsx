import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { getAccessToken, getSelectedLocationId } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateLocations = ({ open, setOpen }: Props) => {
  const { locations, fetchData, company } = useContext(AppContext);
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });

  const createNewLocation = async () => {
    const isValid = newLocation.name && newLocation.address && company;
    if (!isValid) return alert("name and address are required.");

    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newLocation.name,
        address: newLocation.address,
        companyId: company.id,
      }),
    });

    accessToken && fetchData();
    setOpen(false);
  };

  return (
    <Box sx={{ p: 5 }}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Create new tables
        </DialogTitle>

        <DialogContent sx={{ width: 400 }}>
          <TextField
            placeholder="name"
            sx={{ width: "100%" }}
            onChange={(event) =>
              setNewLocation({ ...newLocation, name: event.target.value })
            }
          />
          <TextField
            placeholder="address"
            sx={{ width: "100%", mt: 3 }}
            onChange={(event) =>
              setNewLocation({ ...newLocation, address: event.target.value })
            }
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" onClick={createNewLocation}>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateLocations;
