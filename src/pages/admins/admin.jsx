import { getAdminUsers } from "../../remote/admin-user";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  useTheme,
} from "@mui/material";

import "./admin.scss";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdminUsers().then((response) => {
      if (response.message === "successful") {
        setUsers(response.data);
      }
    });
  }, []);

  const columns = [
    { field: "fullName", headerName: "Name", minWidth: 300, flex: 1 },
    {
      field: "username",
      headerName: "Username",
      minWidth: 150,
      flex: 0.5,
      _props: { className: "fw-semibold" },
      valueGetter: (params) => {
        return params.row.user.username;
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      valueGetter: (params) => {
        return params.row.user.email;
      },
    },

    {
      field: "createdAt",
      headerName: "Date registered",
      width: 150,
      valueFormatter(params) {
        if (!params.value) {
          return "";
        }
        return Intl.DateTimeFormat("en-US").format(new Date(params.value));
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <Select value={status} onChange={() => {}} variant='standard'>
            <MenuItem value='ACTIVE'>Active</MenuItem>
            <MenuItem value='SUSPENDED'>Suspended</MenuItem>
            <MenuItem value='DISABLED'>Disabled</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 150,
      renderCell: (params) => {
        const user = params.row;

        return (
          <Link
            to={"/dashboard/admins/" + user.id}
            className='background-primary rounded text-light p-2'>
            User settings
          </Link>
        );
      },
    },
  ];
  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const parentTheme = useTheme();
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "#00002B",
          height: "100%",
          display: "flex",
        }}>
        <div style={{ flexGrow: 1 }}>
          <ThemeProvider
            theme={createTheme({
              ...parentTheme,
              palette: {
                mode: "dark",
              },
            })}>
            <DataGrid autoHeight columns={columns} rows={users} pageSize={12} />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Admin;
