import { useState } from "react";
import useForm from "../../hooks/useForm";
import Button from "../Button";
import FormField from "../FormField";

const INITIAL_VALUE = {
    name: "",
    category_id: "",
    quantity: "",
    selling_price: ""
};

function isBlank(value) {
    return String(value).trim() === "";
}

function toFormValues(product) {
    if (!product) {
        return INITIAL_VALUE;
    }

    return {
        name: product.name ?? "",
        category_id: product.category_id ?? "",
        quantity: product.quantity ?? "",
        selling_price: product.selling_price ?? ""
    };
}

function validate(values) {
    const { name, category_id, quantity, selling_price } = values;

    const errors = {
        name: "",
        category_id: "",
        quantity: "",
        selling_price: ""
    };

    if (isBlank(name)) {
        errors.name = "Name is required.";
    }

    if (isBlank(category_id) || !Number(category_id)) {
        errors.category_id = "Category is required.";
    }

    if (isBlank(quantity) || !Number(quantity)) {
        errors.quantity = "Quantity is required.";
    }

    if (isBlank(selling_price) || !Number(selling_price)) {
        errors.selling_price = "Selling price is required.";
    }

    return errors;
}

function toCreateProductPayload(values) {
    return {
        name: values.name.trim(),
        category_id: Number(values.category_id),
        quantity: Number(values.quantity),
        selling_price: Number(values.selling_price)
    };
}

function ProductForm({ categories, product, onSubmit, onHandleCancel }) {
    const isEditing = Boolean(product);

    const {
        values,
        errors,
        message,
        loading,
        handleChange,
        handleSubmit
    } = useForm({ 
        initialValue: toFormValues(product), 
        validate, 
        onSubmit: (formValues) => onSubmit(toCreateProductPayload(formValues)) 
    });

    return (
        <div className="p-6">
            <h3 className="mb-3">{isEditing ? "Update Product" : "Create Product"}</h3>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Name"
                    name="name"
                    type="text"
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    disabled={loading}
                />
                <FormField 
                    label="Category"
                    name="category_id"
                    type="select"
                    selectValues={categories}
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    disabled={loading}
                />
                <FormField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    disabled={loading}
                />
                <FormField  
                    label="Selling Price"
                    name="selling_price"
                    type="decimal"
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    disabled={loading}
                />
                <div className="flex gap-3">
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? "Saving..."
                            : isEditing ? "Update" : "Save"
                        }
                    </Button>
                    <Button type="button" onHandleClick={onHandleCancel} disabled={loading}>
                        Cancel
                    </Button>
                </div>
            </form>

            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default ProductForm;