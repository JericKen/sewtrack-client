import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductTable from "../components/ProductTable";
import PageHeader from "../components/ProductPageHeader";
import SearchBar from "../components/SearchBar";

function Products() {
    const {
        products,
        loading,
        error,
        search,
        setSearch,
        createProduct,
        createLoading
    } = useProducts();

    async function handleAddProduct() {
        const product = {
            name: "Test add product",
            category_id: 1,
            quantity: 10,
            selling_price: 50
        }
        await createProduct(product);
    }

    async function handleSearch(value) {
        setSearch(value);
    }

    if (loading) {
        return <h3>Loading products...</h3>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    return (
        <div>
            <PageHeader 
                title={"Products"} 
                buttonText={"Add Product"}
                onHandleAdd={handleAddProduct}
                createLoading={createLoading}
            />
            <SearchBar 
                value={search}
                onHandleSearch={handleSearch}
                placeholder={"Search name or SKU..."}
            />
            <ProductTable products={products}/>
        </div>
    );
}

export default Products;