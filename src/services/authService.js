import api from "../api/axios";

export async function loginUser(data) {
    const response = await api.post("/auth/login", data);
    console.log(response);
    return response.data;
}