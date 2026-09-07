import ProductRow from "./ProductRow";

export default function ProductTable({ products }) {
    if (products.length === 0) {
        return (
            <h3 className="pl-6 mt-6">No products found.</h3>
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