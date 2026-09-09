import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductTable from "../components/products/ProductTable";
import PageHeader from "../components/products/ProductPageHeader";
import SearchBar from "../components/SearchBar";
import ProductForm from "../components/products/ProductForm";

function Products() {
    const [isFormOpen, setIsFormOpen] = useState(false);

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

    async function handleCreateProduct(product) {
        const response = await createProduct(product);
        setIsFormOpen(false);
        return response;
    }

    async function handleSearch(value) {
        setSearch(value);
    }

    return (
        <div>
            <PageHeader 
                title={"Products"} 
                buttonText={"Add Product"}
                onHandleAdd={() => setIsFormOpen(true)}
                createLoading={createLoading}   
                createError={createError}
            />
            <SearchBar 
                value={search}
                onHandleSearch={handleSearch}
                placeholder={"Search name or SKU..."}
            />
            {error && <h3 className="pl-6 mt-4">{error.message}</h3>}
            {loading && <h3 className="pl-6 mt-4">Loading products...</h3>}
            {!loading && !error && (<ProductTable   
                products={products}
                onHandleDelete={(id) => deleteProduct(id)}
            />)}
            {isFormOpen && (<ProductForm 
                onSubmit={handleCreateProduct} 
                onHandleCancel={() => setIsFormOpen(false)} 
            />)}
        </div>
    );
}

export default Products;