import { Box, Button, Chip, Input, TextField } from "@mui/material";
import Layout from "../Layout";
import { useState } from "react";
import FileDropzone from "./FileDropzone";
import { config } from "../config/config";
console.log("Config", config);

const CreateMenu = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
  });

  const createNewMenu = async () => {
    // console.log("Create new menu", newMenu)
    // console.log("selcec file",selectedFiles)
    const accessToken = localStorage.getItem("accessToken");
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return console.log("Name and description required..");

    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      // console.log(responseData);
      newMenu.assetUrl = responseData.assetUrl;
      // console.log("newMenu", newMenu);
    }
    console.log("NewMenu", newMenu);

    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
  };

  const onFileSelected = (selectedFiles: File[]) => {
    console.log("hello", selectedFiles);
    setSelectedFiles(selectedFiles);
  };

  return (
    <Layout title="Create Menu">
      <Box
        sx={{ p: 6, display: "flex", flexDirection: "column", width: "400px" }}
      >
        <TextField
          placeholder="Name"
          sx={{ mb: 3 }}
          onChange={(event) =>
            setNewMenu({ ...newMenu, name: event.target.value })
          }
        />
        <TextField
          placeholder="Description"
          sx={{ mb: 3 }}
          onChange={(event) =>
            setNewMenu({ ...newMenu, description: event.target.value })
          }
        />
        <TextField
          placeholder="Price"
          type="number"
          sx={{ mb: 3 }}
          onChange={(event) =>
            setNewMenu({ ...newMenu, price: Number(event.target.value) })
          }
        />
        <Box sx={{ mb: 3 }}>
          <FileDropzone onFileSelected={onFileSelected} />
          <Box sx={{ mt: 2 }}>
            {selectedFiles?.map((file) => {
              return (
                <Chip
                  sx={{ mb: 2 }}
                  key={file.name}
                  label={file.name}
                  onDelete={() => {
                    const filterSelectedFile = selectedFiles.filter(
                      (selectFile) => selectFile.name !== file.name
                    );
                    setSelectedFiles(filterSelectedFile);
                  }}
                />
              );
            })}
          </Box>
        </Box>
        <Button
          sx={{ width: "fit-content" }}
          variant="contained"
          onClick={createNewMenu}
        >
          Create Menu
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateMenu;
