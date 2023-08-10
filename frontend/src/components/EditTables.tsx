import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import { getAccessToken } from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Tables } from "../typings/types";
import DeleteDialog from "./DeleteDialog";

const EditTables = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tableId = params.id as string;
  const { addons, fetchData, tables } = useContext(AppContext);

  const accessToken = getAccessToken();
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState<Tables>();

  const updateTables = async () => {
    const isVaid = table?.name;
    if (!isVaid) return alert("Name is required");
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    });
    accessToken && fetchData();
    navigate("/tables");
  };
  const handleDeleteTables = async () => {
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData();
    setOpen(false);
    navigate("/tables");
  };
  useEffect(() => {
    if (addons.length) {
      const validTable = tables.find((item) => item.id === Number(tableId));
      setTable(validTable);
    }
  }, [tables]);

  if (!table) return null;
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
            defaultValue={table.name}
            sx={{ mb: 3 }}
            onChange={(event) =>
              setTable({ ...table, name: event.target.value })
            }
          />

          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={updateTables}
          >
            update
          </Button>
        </Box>
        <DeleteDialog
          title={"Are you sure you want to delete this addon categories"}
          open={open}
          setOpen={setOpen}
          callback={handleDeleteTables}
        />
      </Box>
    </Layout>
  );
};
export default EditTables;
