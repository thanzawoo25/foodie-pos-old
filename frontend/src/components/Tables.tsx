import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "../Layout";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { getAccessToken, getSelectedLocationId } from "../Utils/general";
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
            mt: 5,
          }}
        >
          {isValidTables.map((table) => {
            return (
              <Box
                key={table.name}
                sx={{
                  boxShadow: 4,
                  width: "8rem",
                  height: "5rem",
                  p: 1,
                  m: 1,
                  borderRadius: 3,
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {table.name}
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
