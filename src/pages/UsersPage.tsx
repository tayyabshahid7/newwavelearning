import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/GetApp";
import { deleteUser, getUsers, getUsersPage, getUserTypes } from "services/common";
import PromptDialog from "components/PromptDialog";
import { useSnackbar } from "notistack";
import AddUserDialog from "components/AddUserDialog/inedx";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { CSVDownload } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";

const UsersPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const [deleteDialog, setDeleteDialog] = useState<any>({
    open: false,
    user: null,
  });
  const [downloadLearnersCSV, setDownloadLearnersCSV] = useState<boolean>(false);
  const [learnersCsvData, setLearnersCsvData] = useState<any>(null);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
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
      const response: any = await getUserTypes();
      setRoles(response.data.roles);

      let users = response.data.users;
      let data = users.map((user: any, i: number) => [user.email, user.first_name, user.last_name]);
      data = [["email", "first Name", "last name"], ...data];

      setLearnersCsvData(data);
    };
    fetchTypes();
  }, []);

  const columns = [
    {
      name: "id",
      options: { display: "false" as const },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "first_name",
      label: "Name",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const id = tableMeta?.rowData[0];
          let user: any = null;
          if (id) user = userList.filter((item: any) => item.id == id)[0];
          return (
            <div>
              {user.first_name} {user.last_name}
            </div>
          );
        },
      },
    },

    {
      name: "role",
      label: "Role",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "last_login",
      label: "Last login",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const id = tableMeta?.rowData[0];
          let user: any = null;
          if (id) user = userList.filter((item: any) => item.id == id)[0];
          return (
            <div style={{ display: "flex" }}>
              <Button size="small" onClick={() => history.push(`/users/${id}/`)}>
                View
              </Button>
              <Button variant="text" color="error" onClick={() => handleDeleteUser(user)}>
                Delete
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options: any = {
    serverSide: true,
    filterType: "",
    selectableRows: false,
    download: false,
    filter: false,
    search: false,
    print: false,
    responsive: "standard",
    viewColumns: false,
    count: pagination?.count,
    rowsPerPageOptions: [],
    onTableChange: (action: any, tableState: any) => {
      if (action === "changePage") handleChangePage(null, tableState.page + 1);
    },
  };

  const handleDownloadLearnersCSV = async () => {
    setDownloadLearnersCSV(true);
    setTimeout(setDownloadLearnersCSV, 100, false);
  };

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
      console.log("error" + error);
    }
  };

  const handleDeleteUser = (user: any) => {
    setDeleteDialog({
      open: true,
      user: user,
    });
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser(deleteDialog.user.id);
      const newUserList = userList.filter((u: any) => u.id !== deleteDialog.user.id);
      setUserList(newUserList);
      setPagination({ ...pagination, count: pagination.count - 1 });
    } catch (error: any) {
      enqueueSnackbar("Could not delete user. Try deleting all data related to this user.", {
        variant: "error",
      });
    }
    setDeleteDialog({ open: false, user: null });
  };

  const handleAddUser = (user: any) => {
    setUserList([user, ...userList]);
    setAddDialogOpen(false);
  };

  const components = {
    icons: {
      DownloadIcon,
    },
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
          <Button fullWidth onClick={() => setAddDialogOpen(true)}>
            Add New User
          </Button>
        </Stack>

        {downloadLearnersCSV && <CSVDownload data={learnersCsvData} target="_blank" />}
        <Grid sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleDownloadLearnersCSV}>
            <GetAppIcon />
            <span style={{ marginLeft: "7px" }}> Download All Users</span>
          </Button>
        </Grid>
        <MUIDataTable
          title={"Users List"}
          components={components}
          data={userList}
          columns={columns}
          options={options}
        />
      </Stack>
      <PromptDialog
        open={deleteDialog.open}
        title={`Are you sure you want to delete the user?`}
        content={`User: ${deleteDialog.user?.email}`}
        confirmCallback={confirmDeleteUser}
        closeCallback={() => setDeleteDialog({ open: false, user: null })}
      />
      <AddUserDialog
        open={addDialogOpen}
        addedUserCallback={handleAddUser}
        cancelCallback={() => setAddDialogOpen(false)}
      />
    </DashboardLayout>
  );
};

export default UsersPage;
