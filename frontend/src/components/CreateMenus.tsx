import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import {
  getMenuCategoriesByLocationIds,
  getSelectedLocationId,
} from "../Utils";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";
import FileDropzone from "./FileDropzone";
console.log("Config", config);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenus = ({ open, setOpen }: Props) => {
  const { menuCategories, menusMenuCategoriesLocations, fetchData } =
    useContext(AppContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const selectLocationId = getSelectedLocationId() as string;

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
    locationId: selectLocationId,
    menuCategoryIds: [] as number[],
  });

  const createNewMenu = async () => {
    console.log("Create new menu", newMenu);
    // console.log("selcec file",selectedFiles)
    const isValid =
      newMenu.name && newMenu.description && newMenu.menuCategoryIds.length;
    if (!isValid)
      return alert("Name , description and menuCategoryIds required..");

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
    accessToken && fetchData();
    setOpen(false);
  };

  const validMenuCategory = getMenuCategoriesByLocationIds(
    menuCategories,
    menusMenuCategoriesLocations
  );

  const mappedMenuCategory = validMenuCategory.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const onFileSelected = (selectedFiles: File[]) => {
    console.log("hello", selectedFiles);
    setSelectedFiles(selectedFiles);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        New Menu Categories
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
          }}
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
            <Autocomplete
              options={mappedMenuCategory}
              label="Menu Categories"
              placeholder="Menu Categories"
              onChange={(options) =>
                setNewMenu({
                  ...newMenu,
                  menuCategoryIds: options.map((item) => item.id),
                })
              }
            />
          </Box>

          <Box>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ width: "fit-content", mb: 3, mr: 2 }}
          variant="contained"
          onClick={createNewMenu}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenus;
