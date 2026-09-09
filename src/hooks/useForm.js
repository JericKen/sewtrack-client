import { useState } from "react";
import normalizeError from "../utils/normalizeError";

function useForm({ initialValue, validate, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setValues(values => ({
            ...values,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validate(values);

        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const response = await onSubmit(values);
            setMessage(response.message);
        } catch (e) {
            const error = normalizeError(e);
            console.log(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setErrors({});
        setValues(initialValue);
        setMessage("");
    }

    return {
        values,
        errors,
        message,
        loading,
        handleChange,
        handleSubmit
    };
} 

export default useForm;