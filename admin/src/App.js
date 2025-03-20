import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import Users from "./pages/users/Users";
import Hotels from "./pages/hotels/Hotels";
import Rooms from "./pages/rooms/Rooms";
import AddRoom from "./pages/rooms/AddRoom";
import Bookings from "./pages/bookings/Bookings";
import { hotelInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import "./style/global.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
                <Route path=":userId" element={<Single />} />
              </Route>
              <Route path="hotels">
                <Route index element={<Hotels />} />
                <Route path="new" element={<New inputs={hotelInputs} title="Add New Hotel" />} />
                <Route path=":hotelId" element={<Single />} />
                <Route path=":hotelId/rooms/new" element={<AddRoom />} />
              </Route>
              <Route path="rooms">
                <Route index element={<Rooms />} />
                <Route path=":roomId" element={<Single />} />
              </Route>
              <Route path="bookings">
                <Route index element={<Bookings />} />
                <Route path=":bookingId" element={<Single />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
