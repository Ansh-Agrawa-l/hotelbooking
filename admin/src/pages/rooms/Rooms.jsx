import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./rooms.scss";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("/rooms");
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`/rooms/${roomId}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "Room ID", width: 220 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "hotelName", headerName: "Hotel", width: 200 },
    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
    { field: "maxPeople", headerName: "Max People", width: 120 },
    { field: "desc", headerName: "Description", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="actions">
          <Link to={`/rooms/${params.row._id}`}>
            <Button variant="contained" color="primary" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rooms">
      <div className="datatable">
        <div className="datatableTitle">
          Manage Rooms
          <Link to="/rooms/new" className="link">
            Add New Room
          </Link>
        </div>
        <DataGrid
          rows={rooms}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row._id}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Rooms; 