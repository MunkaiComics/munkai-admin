import React, { useEffect, useState } from "react";
import { getUsers } from "../../remote/user";
import { removeAdminUser } from "../../remote/admin-user";
import { Link } from "react-router-dom";
import "./users.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  useTheme,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      if (response.message === "successful") {
        setUsers(response.data);
      }
    });
  }, [loading]);
  const getBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "SUSPENDED":
        return "warning";
      case "DISABLED":
        return "danger";
      default:
        return "primary";
    }
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      minWidth: 150,
      flex: 0.5,
      _props: { className: "fw-semibold" },
    },
    { field: "email", headerName: "Email", minWidth: 300, flex: 1 },

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

        return user.adminUser === 1 ? (
          <button
            className='bg-danger rounded text-light p-2 border-0'
            onClick={() => removeAdmin(user.id)}>
            Remove Admin
          </button>
        ) : (
          <Link
            to={"/dashboard/admins/create/" + user.id}
            className='background-primary rounded text-light p-2'>
            Make Admin
          </Link>
        );
      },
    },
  ];
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const removeAdmin = (id) => {
    setLoading(true);
    removeAdminUser({ id }).then((response) => {
      if (response.statusCode === 200 || response.statusCode === 201) {
      }
      setLoading(false);
    });
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

export default Users;
