import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { formatCurrency } from "../utils/currency";

function PageHeader({ title, buttonText, onHandleAdd}) {
    return (
        <div className="flex justify-between items-center p-6 mb-6 bg-[#f1f1f1] shadow">
            <h3 className="">{title}</h3>
            <button     
                className="py-1 px-4 bg-black rounded-lg text-white "
                onClick={onHandleAdd}
            >
                {buttonText}
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
                        <th className="border   ">Selling Price</th>
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
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    function handleAddProduct() {
        alert("Test");
    }

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await getProducts();

                if (!response.success) {
                    setError(response.message);
                    return;
                }

                setProducts(response.data)
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

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
            />
            <SearchBar 
                value={search}
                onHandleSearch={(value) => setSearch(value)}
                placeholder={"Search name or SKU..."}
            />
            <ProductTable products={products}/>
        </div>
    );
}

export default Products;