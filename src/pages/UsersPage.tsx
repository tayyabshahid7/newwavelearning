import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { getUsers, getUsersPage, getUserTypes } from "services/common";

const UsersPage = () => {
  const [roles, setRoles] = useState<string[]>(["all"]);
  const [userList, setUserList] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    role: "all",
    searchText: "",
  });
  const [pagination, setPagination] = useState<any>({
    next: null,
    previous: null,
    page: 0,
    count: 0,
  });

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await getUserTypes();
      setRoles(response.data);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await getUsers(filters.role);
        setUserList(response.data.results);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
          page: 0,
          count: response.data.count,
        });
      } catch (error: any) {
        console.log(error);
      }
    };
    getUserList();
  }, [filters.role, setUserList]);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    let pageUrl = null;
    if (newPage > pagination.page) {
      pageUrl = pagination.next;
    } else if (newPage < pagination.page) {
      pageUrl = pagination.previous;
    }

    try {
      const response = await getUsersPage(pageUrl);
      setUserList(response.data.results);
      delete response.data.results;
      setPagination({ ...response.data, page: newPage });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserFilterChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setFilters({ ...filters, role: event.target.value });
  };

  const handleTextChange = (event: any) => {
    setFilters({ ...filters, searchText: event.target.value });
  };

  const handleSearchUser = async (event: any) => {
    event.preventDefault();
    try {
      const response = await getUsers(filters.role, filters.searchText);
      setUserList(response.data.results);
      setPagination({
        next: response.data.next,
        previous: response.data.previous,
        page: 0,
        count: response.data.count,
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout selectedPage={"users"}>
      <Typography variant="h2">Users</Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="select-user-role-label">User role</InputLabel>
            <Select
              labelId="select-user-role-label"
              id="select-user-role"
              value={filters.role || "all"}
              label="User type"
              onChange={handleUserFilterChange}
              sx={{ textTransform: "capitalize" }}
            >
              <MenuItem value="all">All</MenuItem>
              {roles.map((ut: any) => (
                <MenuItem key={ut} value={ut} sx={{ textTransform: "capitalize" }}>
                  {ut}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleSearchUser} style={{ width: "100%" }}>
            <TextField
              value={filters.searchText}
              onChange={handleTextChange}
              label="Search"
              fullWidth
            />
          </form>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell colSpan={2}>Last login</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>{user.last_login || "-"}</TableCell>
                  <TableCell align="right">
                    <Button size="small">View</Button>
                    <Button variant="text" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  count={pagination.count}
                  page={pagination.page}
                  rowsPerPage={10}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
    </DashboardLayout>
  );
};

export default UsersPage;
