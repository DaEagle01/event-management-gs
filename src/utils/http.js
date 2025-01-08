import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use(
    (config) => {
        if (typeof window === "undefined") return config;

        const accessToken = localStorage.getItem("accessToken") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NDMwZGU1NS1jNzg5LTRhM2ItYjJmYi04NTRmZWM4ZDI2OGYiLCJpYXQiOjE3MzYyNTA3NjEsImV4cCI6MTczNjg1NTU2MX0.Rt27gUndFzKSdAgGAKZ98KduznPzg1pq-YdPDI5bwrs";
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
); 
 
export { http  };
