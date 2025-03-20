import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./rooms.scss";

const AddRoom = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: [{ number: "", unavailableDates: [] }],
  });

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  const fetchHotel = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/hotels/${hotelId}`);
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomNumberChange = (index, value) => {
    const newRoomNumbers = [...formData.roomNumbers];
    newRoomNumbers[index].number = value;
    setFormData((prev) => ({
      ...prev,
      roomNumbers: newRoomNumbers,
    }));
  };

  const addRoomNumber = () => {
    setFormData((prev) => ({
      ...prev,
      roomNumbers: [...prev.roomNumbers, { number: "", unavailableDates: [] }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8800/api/rooms/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(`/admin/hotels/${hotelId}`);
      } else {
        console.error("Error adding room");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="addRoom">
      <div className="addRoomContainer">
        <h2>Add New Room to {hotel.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Max People</label>
            <input
              type="number"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Room Numbers</label>
            {formData.roomNumbers.map((room, index) => (
              <div key={index} className="roomNumberInput">
                <input
                  type="text"
                  value={room.number}
                  onChange={(e) => handleRoomNumberChange(index, e.target.value)}
                  placeholder="Room number"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addRoomNumber} className="addButton">
              Add Room Number
            </button>
          </div>

          <button type="submit" className="submitButton">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom; 