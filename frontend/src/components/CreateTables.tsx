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
const CreateTables = ({ open, setOpen }: Props) => {
  const { tables, fetchData } = useContext(AppContext);
  const [newTable, setNewTable] = useState("");
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();
  const isValidTables = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );
  console.log("isvalid Table", isValidTables);
  const createNewTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newTable,
        locationId: selectedLocationId,
      }),
    });
    fetchData();

    setOpen(false);
  };
  console.log("all tables", tables);
  return (
    <Box sx={{ p: 5 }}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Create new tables
        </DialogTitle>

        <DialogContent sx={{ width: 400 }}>
          <TextField
            placeholder="Table name"
            sx={{ width: "100%" }}
            onChange={(event) => setNewTable(event.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" onClick={createNewTable}>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateTables;
