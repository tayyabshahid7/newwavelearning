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
import React, { useEffect, useState } from "react";
import { addUser, getUserTypes } from "services/common";

interface AddUserDialogProps {
  open: boolean;
  cancelCallback: (data?: any) => any;
  addedUserCallback: (user?: any) => any;
}

const AddUserDialog = ({ open, cancelCallback, addedUserCallback }: AddUserDialogProps) => {
  const [user, setUser] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    role: "learner",
  });
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const response: any = await getUserTypes();
      setRoles(response.data);
    };
    if (open) {
      fetchTypes();
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        role: "learner",
      });
    }
  }, [open]);

  const handleCancel = () => {
    cancelCallback();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUser({ ...user, role: event.target.value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    try {
      const response = await addUser(user);
      setUser(response.data);
      addedUserCallback(response.data);
    } catch (error: any) {
      console.log(error);
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
              value={user.first_name}
              onChange={handleTextChange}
            />
            <TextField
              fullWidth
              name="last_name"
              label="Last name"
              value={user.last_name}
              onChange={handleTextChange}
            />
          </Stack>
          <TextField
            id="email"
            name="email"
            label="Email address"
            value={user.email}
            onChange={handleTextChange}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              id="role"
              value={user.role}
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

export default AddUserDialog;
