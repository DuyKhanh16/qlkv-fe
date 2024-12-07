import axios from "axios";
import Cookies from 'js-cookie';


const baseURL = "http://localhost:8080";


const privateAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi
},
withCredentials: true, // Nếu cần gửi cookie hoặc thông tin xác thực
});

privateAxios.interceptors.request.use((config) => {
  const jwtTokent = Cookies.get("token");
  
  if (jwtTokent) {
    config.headers.Authorization = `Bearer ${jwtTokent}`;
  }
  return config;
  // return {
  //   ...config,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${jwtTokent}`,
  //   },
  // };
});

const publicAxios = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export { privateAxios, publicAxios };