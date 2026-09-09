import useForm from "../../hooks/useForm";
import Button from "../Button";

function ProductForm({ onSubmit, isEditing, editingId, initialValue }) {
    const {
        values,
        errors,
        message,
        loading,
        handleChange,
        handleSubmit
    } = useForm({ initialValue, validate, onSubmit });

    async function validate(values) {
        const { name, category_id, quantity, selling_price } = values;

        const newErrors = {
            name: "",
            category_id: "",
            quantity: "",
            selling_price: ""
        };

        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!Number(category_id)) {
            newErrors.category_id = "Category id is required.";
        }

        if (!Number(quantity)) {
            newErrors.quantity = "Quantity is required.";
        }

        if (!Number(selling_price)) {
            newErrors.selling_price = "Selling price is required.";
        }

        return newErrors;
    }

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit}>
                <label>Name: {" "}
                    <input 
                        type="text" 
                        value={values.name}
                        onChange={handleChange}
                        name="name"
                        className="border rounded"
                    />
                </label>
                <br />
                <label>Category id: {" "}
                    <input 
                        type="number" 
                        value={values.category_id}
                        onChange={handleChange}
                        name="category_id"
                        className="border rounded"
                    />
                </label>
                <br />
                <label>Quantity: {" "}
                    <input 
                        type="number" 
                        value={values.quantity}
                        onChange={handleChange}
                        name="quantity"
                        className="border rounded"
                    />
                </label>
                <br />
                <label>Selling Price: {" "}
                    <input 
                        type="number" 
                        value={values.selling_price}
                        onChange={handleChange}
                        name="selling_price"
                        className="border rounded"
                    />
                </label>
                <br />
                <Button type={"submit"} disabled={loading}>
                     {loading 
                        ? "Saving..."
                        : "Save"
                    }
                </Button>
            </form>

            <p>{errors.name}</p>
            <p>{errors.category_id}</p>
            <p>{errors.quantity}</p>
            <p>{errors.selling_price}</p>
            <p>{message}</p>
        </div>
    );
}

export default ProductForm;