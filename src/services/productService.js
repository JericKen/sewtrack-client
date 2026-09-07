import api from "../api/axios";

export async function getProducts(search = "") {
    const response = await api.get("/products", {
        params: {
            search
        }
    });
    return response.data;   
}

export async function getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export async function addProduct(product) {
    const response = await api.post("/products", product);
    return response.data;
}

export async function updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}