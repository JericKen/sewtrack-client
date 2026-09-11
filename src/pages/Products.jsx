import { useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
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

    const {
        categories
    } = useCategories();

    function openCreateForm() {
        setEditingProduct(null);
        setIsFormOpen(true);
    }

    function openUpdateForm(productData) {
        setEditingProduct(productData);
        setIsFormOpen(true);
    }

    function closeForm() {
        setEditingProduct(null);
        setIsFormOpen(false);
    }

    async function handleSaveProduct(productData) {
        if (editingProduct) {
            closeForm();
            return updateProduct(
                editingProduct.id,
                productData
            );
        }

        closeForm();
        return createProduct(productData);
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
                onHandleSearch={setSearch}
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
                categories={categories}
                product={editingProduct}
                onSubmit={handleSaveProduct} 
                onHandleCancel={closeForm} 
            />)}
        </div>
    );
}

export default Products;