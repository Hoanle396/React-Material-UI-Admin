export const __prod__ = import.meta.env.VITE_NODE_ENV == "production";
export const sidebar_xs = 100;
export const sidebar_size = 300;
export const API_URL = import.meta.env.API_URL || "http://localhost:4000/api/"
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID 

export const STORAGE_KEY = {
    refreshToken: "refresh_token",
    accessToken: "access_token"
}