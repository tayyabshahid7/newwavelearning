import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

interface PromptDialogProps {
  open: boolean;
  title: string;
  okButtonText?: string;
  cancelButtonText?: string;
  buttonsPosition?: "center" | "flex-end" | "flex-start";
  confirmCallback: (props?: any) => any;
  closeCallback: (props?: any) => any;
  content?: React.ReactNode;
  match?: string;
}

const PromptDialog = ({
  open,
  title,
  okButtonText = "Ok",
  confirmCallback,
  closeCallback,
  cancelButtonText = "Cancel",
  content,
  buttonsPosition = "center",
  match,
}: PromptDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [matchValue, setMatchValue] = useState<string | undefined>("");
  const [canConfirm, seCanConfirm] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const newMatchValue = event.target.value;
    if (newMatchValue === match) {
      seCanConfirm(true);
    } else {
      seCanConfirm(false);
    }
    setMatchValue(newMatchValue);
  };

  const handleConfirm = () => {
    confirmCallback();
    seCanConfirm(false);
    setMatchValue("");
  };

  const handleClose = () => {
    closeCallback();
    seCanConfirm(false);
    setMatchValue("");
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeCallback}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>{content}</DialogContentText>

          {match && (
            <TextField
              fullWidth
              placeholder={`Please type ${match} to delete`}
              value={matchValue}
              onChange={handleChange}
              size="small"
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: buttonsPosition }}>
        <Button onClick={handleConfirm} autoFocus disabled={!canConfirm}>
          {okButtonText}
        </Button>
        <Button color="error" autoFocus onClick={handleClose}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptDialog;
