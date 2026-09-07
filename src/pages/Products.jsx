import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/currency";
import Button from "../components/Button";
import useProducts from "../hooks/useProducts";

function ActionCell({ product, onHandleUpdate, onHandleDelete }) {
    return (
        <div className="flex justify-center items-center gap-[20px] w-[300px] p-1">
            <Button onHandleClick={onHandleUpdate}>
                Update
            </Button>
            <Button onHandleClick={onHandleDelete}>
                Delete
            </Button>
        </div>
    );
}

function PageHeader({ title, buttonText, onHandleAdd, createLoading}) {
    return (
        <div className="flex justify-between items-center p-6 mb-6 bg-[#f1f1f1] shadow">
            <h3 className="">{title}</h3>
            <button     
                className="py-1 px-4 bg-black rounded-lg text-white "
                onClick={onHandleAdd}
            >
                {createLoading ? "..." : buttonText}
            </button>
        </div>
    );
}

function ProductTable({ products }) {
    if (products.length === 0) {
        return (
            <h3>No products found.</h3>
        );
    }

    return (
        <div className="p-6 w-full">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border p-1">Name</th>
                        <th className="border">SKU</th>
                        <th className="border">Quantity</th>
                        <th className="border">Selling Price</th>
                        <th className="border w-[300px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductRow 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProductRow({ product }) {
    return (
        <tr>
            <td className="border p-1">{product.name}</td>
            <td className="border text-center">{product.sku}</td>
            <td className="border text-center">{product.quantity}</td>
            <td className="border text-center">{formatCurrency(product.selling_price)}</td>
            <td className="border">
                <ActionCell 
                    product={product} 
                    onHandleDelete={() => alert(product.name)} 
                    onHandleUpdate={() => alert(product.id)}
                />
            </td>
        </tr>
    );
}

function SearchBar({ value, onHandleSearch, placeholder }) {
    return (
        <div className="pl-6">
            <input 
                className="border rounded p-1 w-[300px]"
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onHandleSearch(e.target.value)}
            />
        </div>
    );
}

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