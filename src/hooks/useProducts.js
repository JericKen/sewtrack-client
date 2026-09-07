import { getProducts, addProduct } from "../services/productService";
import { useState, useEffect, useSyncExternalStore } from "react";
import normalizeError from "../utils/normalizeError";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState("");

    async function fetchProducts(search = "") {
        try {
            const response = await getProducts(search);
            
            if (!response.success) {
                throw new Error("Failed to retrieve product.");
            }

            setProducts(response.data);
        } catch (e) {
            setError(normalizeError(e));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts(search);
    }, [search]);
    
    async function createProduct(product) {
        try {
            setCreateLoading(true);
            const response = await addProduct(product);
            console.log(response);
        } catch (e) { 
            setCreateError(normalizeError(e));
        } finally {
            setCreateLoading(false);
        }
    }

    return {
        products,
        loading,
        error,
        search,
        setSearch,
        createProduct,
        createLoading,
        createError
    };
}