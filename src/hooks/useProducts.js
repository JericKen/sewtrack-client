import { 
    getProducts, 
    addProduct, 
    removeProduct, 
    editProduct
} from "../services/productService";
import useDebounced from "./useDebounced";
import { useState, useEffect } from "react";
import normalizeError from "../utils/normalizeError";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    async function fetchProducts(search = "") {
        try {
            setLoading(true);
            setError(null);

            const response = await getProducts(search);

            setProducts(response.data);
        } catch (e) {
            setError(normalizeError(e));
        } finally {
            setLoading(false);
        }
    }

    const debouncedSearch = useDebounced(search);

    useEffect(() => {
        fetchProducts(debouncedSearch);
    }, [debouncedSearch]);
    
    async function createProduct(product) {
        const response = await addProduct(product);
        const newProduct = response.data;

        setProducts(currentProducts => [
            newProduct,
            ...currentProducts
        ]); 
        return response;
    }

    async function updateProduct(id, product) {
        const response = await editProduct(id, product);
        const updatedProduct = response.data;

        setProducts(currentProducts => 
            currentProducts.map(currentProduct => 
                currentProduct.id === id ? updatedProduct : currentProduct
        ))
        return response;
    }

    async function deleteProduct(id) {
        try {
            const response = await removeProduct(id);

            setProducts(products => products.filter(product => 
                product.id !== id
            ));

            setMessage(response.message);
        } catch (e) {
            console.log(normalizeError(e    ));
            setError(normalizeError(e));
        } 
    }

    return {
        products,
        loading,
        error,
        search,
        message,
        setSearch,
        createProduct,
        updateProduct,
        deleteProduct
    };
}