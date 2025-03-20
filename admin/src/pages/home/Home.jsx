import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./home.scss";

const Home = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalHotels: 0,
    totalRooms: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, hotelsRes, roomsRes] = await Promise.all([
        axios.get("/bookings"),
        axios.get("/hotels"),
        axios.get("/rooms"),
      ]);

      const bookings = bookingsRes.data;
      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.status === "pending").length,
        totalHotels: hotelsRes.data.length,
        totalRooms: roomsRes.data.length,
      });

      setRecentBookings(bookings.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const columns = [
    { field: "_id", headerName: "Booking ID", width: 220 },
    { field: "hotelName", headerName: "Hotel", width: 200 },
    { field: "userName", headerName: "User", width: 200 },
    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
    { field: "status", headerName: "Status", width: 120, renderCell: (params) => (
      <div className={`status ${params.value}`}>{params.value}</div>
    )},
  ];

  return (
    <div className="home">
      <div className="stats">
        <div className="statItem">
          <span className="title">Total Bookings</span>
          <span className="value">{stats.totalBookings}</span>
        </div>
        <div className="statItem">
          <span className="title">Pending Bookings</span>
          <span className="value">{stats.pendingBookings}</span>
        </div>
        <div className="statItem">
          <span className="title">Total Hotels</span>
          <span className="value">{stats.totalHotels}</span>
        </div>
        <div className="statItem">
          <span className="title">Total Rooms</span>
          <span className="value">{stats.totalRooms}</span>
        </div>
      </div>

      <div className="recentBookings">
        <h2>Recent Bookings</h2>
        <DataGrid
          rows={recentBookings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;
