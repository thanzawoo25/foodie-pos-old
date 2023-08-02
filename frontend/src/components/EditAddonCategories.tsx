import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import Layout from "../Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAccessToken } from "../Utils";
import { Addon, AddonCategory } from "../typings/types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Addons from "./Addons";
import { config } from "../config/config";
import DeleteDialog from "./DeleteDialog";

const EditAddonCategories = () => {
  const params = useParams();
  const navigate = useNavigate();
  const addonCategoryId = params.id as string;
  const { addonCategories, fetchData } = useContext(AppContext);

  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [addonCategory, setAddonCategory] = useState<AddonCategory>();

  const updateAddonCategories = async () => {
    if (!addonCategory?.id) return;
    await fetch(`${config.apiBaseUrl}/addon-categories/${addonCategoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addonCategory),
    });
    fetchData();
    navigate("/addon-categories");
  };
  const handleDeletedAddon = async () => {
    if (!addonCategory?.id) return;
    await fetch(`${config.apiBaseUrl}/addon-categories/${addonCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/addon-categories");
  };
  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setAddonCategory(validAddonCategory);
    }
  }, [addonCategories]);

  if (!addonCategory) return null;
  return (
    <Layout title="Edit AddonCategories">
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
            defaultValue={addonCategory.name}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setAddonCategory({ ...addonCategory, name: event.target.value })
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={addonCategory.is_required ? true : false}
                onChange={(event) =>
                  setAddonCategory({
                    ...addonCategory,
                    is_required: event.target.checked,
                  })
                }
              />
            }
            label="required"
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 5 }}
            onClick={updateAddonCategories}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title={"Are you sure you want to delete this addon categories"}
          open={open}
          setOpen={setOpen}
          callback={handleDeletedAddon}
        />
      </Box>
    </Layout>
  );
};
export default EditAddonCategories;
