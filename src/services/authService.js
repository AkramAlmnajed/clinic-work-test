import axios from "axios";

const API_URL = "https://medical-clinic.serv00.net/api/login";

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    if (response.data.status) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred during login"
    );
  }
};

const authService = {
  login,
};

export default authService;
