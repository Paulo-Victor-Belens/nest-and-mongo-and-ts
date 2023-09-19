import axiosInstance from "@/api/axiosInstances";

export const tasksHelper = async () => {
  try {
    const { data } = await axiosInstance.get("/");
    return data;
  } catch (error) {
    console.log(error);
    
  }
};