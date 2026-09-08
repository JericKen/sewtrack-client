import useForm from "../../hooks/useForm";

function ProductForm({ onSubmit }) {
    const initialValue = {
        name: "", 
        category_id: "",
        quantity: "",
        selling_price: ""
    };

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
        }

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: {" "}
                    <input 
                        type="text" 
                        value={values.name}
                        onChange={handleChange}
                        name="name"
                    />
                </label>
                <br />
                <label>Category id: {" "}
                    <input 
                        type="number" 
                        value={values.category_id}
                        onChange={handleChange}
                        name="category_id"
                    />
                </label>
                <br />
                <label>Quantity: {" "}
                    <input 
                        type="number" 
                        value={values.quantity}
                        onChange={handleChange}
                        name="quantity"
                    />
                </label>
                <br />
                <label>Selling Price: {" "}
                    <input 
                        type="number" 
                        value={values.selling_price}
                        onChange={handleChange}
                        name="selling_price"
                    />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading 
                        ? "Saving..."
                        : "Save"
                    }
                </button>
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