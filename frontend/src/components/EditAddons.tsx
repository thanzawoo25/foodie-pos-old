import { Box, Button, TextField } from "@mui/material";
import Layout from "../Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAccessToken } from "../Utils";
import { Addon } from "../typings/types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Addons from "./Addons";
import { config } from "../config/config";
import DeleteDialog from "./DeleteDialog";

const EditAddons = () => {
  const params = useParams();
  const navigate = useNavigate();
  const addonId = params.id as string;
  const { addons, fetchData } = useContext(AppContext);

  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [addon, setAddon] = useState<Addon>();

  const updateAddon = async () => {
    if (!addon?.id) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
    fetchData();
    navigate("/addons");
  };
  const handleDeletedAddon = async () => {
    if (!addon?.id) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/addons");
  };
  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);

  if (!addon) return null;
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
            defaultValue={addon.name}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setAddon({ ...addon, name: event.target.value })
            }
          />
          <TextField
            type="number"
            defaultValue={addon.price}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setAddon({ ...addon, price: Number(event.target.value) })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={updateAddon}
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
export default EditAddons;
