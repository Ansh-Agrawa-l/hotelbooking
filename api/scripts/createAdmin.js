import axios from "axios";

const createAdmin = async () => {
  try {
    const response = await axios.post("http://localhost:8800/api/auth/register", {
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      country: "Admin",
      city: "Admin",
      phone: "1234567890",
      isAdmin: true
    });
    console.log("Admin user created successfully:", response.data);
  } catch (error) {
    console.error("Error creating admin user:", error.response?.data || error.message);
  }
};

createAdmin(); 