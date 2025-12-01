import siteUrls from "@/apiConfigs/ApiConfig";
import axios from "axios";
import toast from "react-hot-toast";

export const eventCreateApi = async (payload) => {
  try {
    const response = await axios.post(siteUrls.event.create, payload);
    return response;
  } catch (error) {
    toast.error(error);
  }
};

export const eventGetApi = async (params) => {
  try {
    const response = await axios.get(`${siteUrls.event.create}${params}`);
    return response;
  } catch (error) {
    toast.error(error);
  }
};
