import axios from "axios";

const AxiosInstance = (token: string | null) => {
  const axiosInstance = axios.create({
    baseURL: 'http://44.201.168.200:9000/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });

  return axiosInstance;
};

export default AxiosInstance;