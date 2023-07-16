import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { getAccessToken, getSelectedLocationId } from "../Utils";
import { AppContext } from "../contexts/AppContext";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";

const Tables = () => {
  const { tables, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
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
    <Layout>
      <Box sx={{ px: 5, pt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create new table
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {isValidTables.map((table) => {
            return (
              <Box
                key={table.id}
                sx={{
                  height: 200,
                  width: 200,
                  border: "2px solid lightgrey",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography>{table.name}</Typography>
              </Box>
            );
          })}
          {/* {isValidTables.map((table) => {
            return <h1 key={table.name}>{table.name}</h1>;
          })} */}
        </Box>
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
    </Layout>
  );
};

export default Tables;
