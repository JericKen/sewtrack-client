import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

export default function useCategories() {
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories
    };
}