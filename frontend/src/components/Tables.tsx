import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { getAccessToken, getSelectedLocationId } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import CreateTables from "./CreateTables";

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
    <Layout title="Tables">
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
          {isValidTables.map((table) => (
            <Link
              to={`/tables/${table.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Paper
                key={table.id}
                sx={{
                  height: 150,
                  width: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  mt: 3,
                }}
              >
                <Typography>{table.name}</Typography>
              </Paper>
            </Link>
          ))}
          {/* {isValidTables.map((table) => {
            return <h1 key={table.name}>{table.name}</h1>;
          })} */}
        </Box>
      </Box>
      <CreateTables open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;
