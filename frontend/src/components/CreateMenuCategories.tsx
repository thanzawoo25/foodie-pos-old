import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateMenuCategories = ({ open, setOpen }: Props) => {
  const { menus, fetchData, locations } = useContext(AppContext);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });
  const createNewMenuCategories = async () => {
    const isValid = newMenuCategory.name && newMenuCategory.locationIds.length;
    if (!isValid) return alert("Name and location are required.");
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    accessToken && fetchData();
    setOpen(false);
  };
  const mappedLocation = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        New Addon Categories
      </DialogTitle>
      <DialogContent>
        <Box sx={{}}>
          <TextField
            placeholder="NAME"
            sx={{ width: 500, mb: 3 }}
            onChange={(event) =>
              setNewMenuCategory({
                ...newMenuCategory,
                name: event.currentTarget.value,
              })
            }
          />
          <Box sx={{ mb: 3 }}>
            <Autocomplete
              options={mappedLocation}
              label={"Location"}
              placeholder={"Location"}
              onChange={(option) => {
                setNewMenuCategory({
                  ...newMenuCategory,
                  locationIds: option.map((item) => item.id),
                });
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2, mb: 1 }}>
          <Button variant="contained" onClick={createNewMenuCategories}>
            create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default CreateMenuCategories;
