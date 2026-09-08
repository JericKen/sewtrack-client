import { 
    getProducts, 
    addProduct, 
    removeProduct 
} from "../services/productService";
import { useState, useEffect, useSyncExternalStore } from "react";
import normalizeError from "../utils/normalizeError";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState(null);

    async function fetchProducts(search = "") {
        try {
            setError(null);

            const response = await getProducts(search);

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
            
            const newProduct = response.data;

            setProducts(currentProducts => [
                newProduct,
                ...currentProducts
            ]);
        } catch (e) { 
            setCreateError(normalizeError(e));
        } finally {
            setCreateLoading(false);
        }
    }

    async function deleteProduct(id) {
        try {
            await removeProduct(id);
        } catch (e) {
            
        } finally {

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
        createError,
        deleteProduct
    };
}