import "./bookings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/bookings");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`/bookings/${bookingId}`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "Booking ID", width: 220 },
    { field: "hotelName", headerName: "Hotel", width: 200 },
    { field: "userName", headerName: "User", width: 200 },
    { field: "roomTitle", headerName: "Room", width: 200 },
    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
    { field: "status", headerName: "Status", width: 120, renderCell: (params) => (
      <div className={`status ${params.value}`}>{params.value}</div>
    )},
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="actions">
          {params.row.status === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleStatusChange(params.row._id, "confirmed")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleStatusChange(params.row._id, "cancelled")}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bookings">
      <Sidebar />
      <div className="bookingsContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Manage Bookings
          </div>
          <DataGrid
            rows={bookings}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            getRowId={(row) => row._id}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookings; 