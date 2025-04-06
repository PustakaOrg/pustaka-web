import { ApiClient } from "../libs/apiClient";

export const api = new ApiClient(import.meta.env.VITE_API_BASE_URL)
