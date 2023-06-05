import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// registerUser user
const registerUser = async (userData) => {
  const path = "/register";
  const url = path;
  const response = await client.post(url, userData);
  return response?.data;
};

// loginUser
const loginUser = async (userData) => {
  try {
    const path = "/login";
    const url = path;

    const response = await client.post(url, userData);
    return response.data;
  } catch (error) {
    // console.error(error.message);
    throw new Error(error);
  }
};

// logoutUser
const logoutUser = async (token) => {
  try {
    const path = "/logout";
    const url = path;
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await client.get(url, config);

    return response.data;
  } catch (error) {
    // console.error(error.message);
    throw new Error(error);
  }
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
