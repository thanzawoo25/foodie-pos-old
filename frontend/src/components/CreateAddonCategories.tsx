import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import Autocomplete from "./Autocomplete";
import { AddonCategory } from "../typings/types";
import { setEmitFlags } from "typescript";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Utils";
import { config } from "../config/config";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const CreateAddonCategories = ({ open, setOpen }: Props) => {
  const { menus, fetchData } = useContext(AppContext);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });
  const createNewAddonCategories = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Name and menu are required.");
    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    accessToken && fetchData();
    setOpen(false);
  };
  const mappedMenus = menus.map((item) => ({
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
            sx={{ width: 500, mb: 3 }}
            onChange={(event) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: event.currentTarget.value,
              })
            }
          />
          <Box sx={{ mb: 3 }}>
            <Autocomplete
              options={mappedMenus}
              label={"Menus"}
              placeholder={"Menus"}
              onChange={(option) => {
                setNewAddonCategory({
                  ...newAddonCategory,
                  menuIds: option.map((item) => item.id),
                });
              }}
            />
          </Box>
          <FormControlLabel
            sx={{ my: 2 }}
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(event) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: event.target.checked,
                  })
                }
              />
            }
            label="required"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 2, mb: 1 }}>
          <Button variant="contained" onClick={createNewAddonCategories}>
            create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default CreateAddonCategories;
