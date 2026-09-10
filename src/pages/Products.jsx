import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductTable from "../components/products/ProductTable";
import PageHeader from "../components/products/ProductPageHeader";
import SearchBar from "../components/SearchBar";
import ProductForm from "../components/products/ProductForm";

function Products() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const {
        products,
        loading,
        error,
        search,
        setSearch,
        createProduct,
        createLoading,
        createError,
        updateProduct,
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

    function openCreateForm() {
        setEditingProduct(null);
        setIsFormOpen(true);
    }

    function openUpdateForm(product) {
        setEditingProduct(product);
        setIsFormOpen(true);
    }

    function closeForm() {
        setEditingProduct(null);
        setIsFormOpen(false);
    }

    async function handleSaveProduct(product) {
        const response = editingProduct 
            ? await updateProduct(editingProduct.id, product)
            : await createProduct(product);

        return response;
    }

    return (
        <div>
            <PageHeader 
                title={"Products"} 
                buttonText={"Add Product"}
                onHandleAdd={openCreateForm}
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
                onHandleUpdate={openUpdateForm}
            />)}
            {isFormOpen && (<ProductForm 
                product={editingProduct}
                onSubmit={handleSaveProduct} 
                onHandleCancel={closeForm} 
            />)}
        </div>
    );
}

export default Products;