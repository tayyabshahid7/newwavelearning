import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface PromptDialogProps {
  open: boolean;
  title: string;
  okButtonText?: string;
  cancelButtonText?: string;
  buttonsPosition?: "center" | "flex-end" | "flex-start";
  confirmCallback: (props: any) => any;
  closeCallback: (props: any) => any;
  content?: React.ReactNode;
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
}: PromptDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeCallback}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: buttonsPosition }}>
        <Button onClick={confirmCallback} autoFocus>
          {okButtonText}
        </Button>
        <Button color="error" autoFocus onClick={closeCallback}>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptDialog;
