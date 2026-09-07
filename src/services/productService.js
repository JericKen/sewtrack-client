import api from "../api/axios";

export async function getProducts(search = "") {
    const response = await api.get("/products", {
        params: {
            search
        }
    });
    return response.data;   
}

export async function addProduct(product) {
    const response = await api.post("/products", product);
    return response.data;
}