import siteUrls from "@/apiConfigs/ApiConfig";
import axios from "axios";

export const logIn = async (payload) => {
  try {
    const response = await axios.post(siteUrls.auth.signin, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const profileGetApi = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(siteUrls.auth.profileGet);
    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
