import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getAddonCategoryByLocationIds } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateAddons = ({ open, setOpen }: Props) => {
  const {
    addonCategories,
    menuAddonCategories,
    fetchData,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });
  const createNewAddons = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid) return alert("Name and addon category are required.");
    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    accessToken && fetchData();
    setOpen(false);
  };

  const validAddonCategories = getAddonCategoryByLocationIds(
    addonCategories,
    menuAddonCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        New Addons
      </DialogTitle>
      <DialogContent>
        <Box sx={{}}>
          <TextField
            placeholder="name"
            sx={{ width: "100%", mb: 3 }}
            onChange={(event) =>
              setNewAddon({
                ...newAddon,
                name: event.currentTarget.value,
              })
            }
          />
          <TextField
            placeholder="price"
            sx={{ width: "100%", mb: 3 }}
            onChange={(event) =>
              setNewAddon({
                ...newAddon,
                price: Number(event.currentTarget.value),
              })
            }
          />
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Addon Category</InputLabel>
              <Select
                label="Addon Category"
                value={newAddon.addonCategoryId}
                onChange={(evt) =>
                  setNewAddon({
                    ...newAddon,
                    addonCategoryId: String(evt.target.value),
                  })
                }
              >
                {validAddonCategories.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2, mb: 1 }}>
          <Button variant="contained" onClick={createNewAddons}>
            create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default CreateAddons;
