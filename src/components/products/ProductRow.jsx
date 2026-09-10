import { formatCurrency } from "../../utils/currency";
import ActionCell from "./ProductActionCell";

export default function ProductRow({ product, onHandleUpdate, onHandleDelete }) {
    return (
        <tr>
            <td className="border p-1">{product.name}</td>
            <td className="border text-center">{product.sku}</td>
            <td className="border text-center">{product.quantity}</td>
            <td className="border text-center">{formatCurrency(product.selling_price)}</td>
            <td className="border">
                <ActionCell 
                    product={product} 
                    onHandleDelete={() => onHandleDelete(product.id)} 
                    onHandleUpdate={() => onHandleUpdate(product)}
                />
            </td>
        </tr>
    );
}