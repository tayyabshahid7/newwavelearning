import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { editUser, getUserTypes } from "services/common";

interface EditUserDialogProps {
  open: boolean;
  user: any;
  cancelCallback: (data?: any) => any;
  editedUserCallback: (user?: any) => any;
}

const EditUserDialog = ({
  user,
  open,
  cancelCallback,
  editedUserCallback,
}: EditUserDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    role: "learner",
  });
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response: any = await getUserTypes();
      setRoles(response.data.roles);
    };
    if (open) {
      fetchTypes();
      setUserData(user);
    }
  }, [open, user]);

  const handleCancel = () => {
    cancelCallback();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    try {
      const response = await editUser(userData, userData.id);
      setUserData(response.data);
      editedUserCallback(response.data);
    } catch (error: any) {
      if (error.response.data.email) {
        enqueueSnackbar(error.response.data.email[0], { variant: "error" });
      }
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              name="first_name"
              label="First name"
              value={userData.first_name}
              onChange={handleTextChange}
            />
            <TextField
              fullWidth
              name="last_name"
              label="Last name"
              value={userData.last_name}
              onChange={handleTextChange}
            />
          </Stack>
          <TextField
            id="email"
            name="email"
            label="Email address"
            value={userData.email}
            onChange={handleTextChange}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              id="role"
              value={userData.role}
              label="Role"
              onChange={handleChange}
            >
              {roles?.map((role: any) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue}>Continue</Button>
        <Button variant="text" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
