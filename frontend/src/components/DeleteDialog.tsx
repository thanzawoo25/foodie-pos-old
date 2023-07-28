import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
}

const DeleteDialog = ({ title, open, setOpen, callback }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>This action can not be undone.</DialogContent>
      <DialogActions>
        <Box>
          <Button
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              callback();
              setOpen(false);
            }}
          >
            comfirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
