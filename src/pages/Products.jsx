import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductTable from "../components/products/ProductTable";
import PageHeader from "../components/products/ProductPageHeader";
import SearchBar from "../components/SearchBar";
import ProductForm from "../components/products/ProductForm";

function Products() {
    const {
        products,
        loading,
        error,
        search,
        setSearch,
        createProduct,
        createLoading,
        createError,
        deleteProduct
    } = useProducts();

    async function handleAddProduct() {
        const product = {
            name: "Test create product",
            category_id: 1,
            quantity: 10,
            selling_price: 50
        }
        await createProduct(product);
    }

    async function handleDeleteProduct(id) {
        await deleteProduct(id)
    }

    async function handleSearch(value) {
        setSearch(value);
    }

    if (loading) {
        return <h3>Loading products...</h3>
    }

    if (error) {
        return <h3>{error.message}</h3>
    }

    return (
        <div>
            <PageHeader 
                title={"Products"} 
                buttonText={"Add Product"}
                onHandleAdd={handleAddProduct}
                createLoading={createLoading}
                createError={createError}
            />
            <SearchBar 
                value={search}
                onHandleSearch={handleSearch}
                placeholder={"Search name or SKU..."}
            />
            <ProductTable 
                products={products}
                onHandleDelete={handleDeleteProduct}
            />
            <ProductForm onSubmit={createProduct}/>
        </div>
    );
}

export default Products;