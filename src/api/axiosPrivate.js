import axios from 'axios';
import Cookies from 'js-cookie';
// Tạo instance của axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // URL gốc của API
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Bật chế độ gửi cookie
});

// Thêm interceptor cho request để lấy token từ cookie
apiClient.interceptors.request.use(
    config => {
        // Lấy token từ cookie
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
        }

        return config;
    },
    error => Promise.reject(error)
);

// Thêm interceptor cho response để xử lý lỗi
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            // Ví dụ: chuyển hướng tới trang login nếu không được phép
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
