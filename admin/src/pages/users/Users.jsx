import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const userColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "username", headerName: "Username", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "isAdmin", headerName: "Admin", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="users">
      <div className="usersContainer">
        <div className="datatable">
          <div className="datatableTitle">
            Manage Users
          </div>
          <DataGrid
            className="datagrid"
            rows={users}
            columns={userColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowHeight={() => "auto"}
            loading={loading}
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Users; 