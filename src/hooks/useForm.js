import { useState } from "react";
import normalizeError from "../utils/normalizeError";

function mapServerErrors(serverErrors) {
    if (!serverErrors) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(serverErrors).map(([field, messages]) => [
            field,
            Array.isArray(messages) ? messages[0] : messages
        ])
    )
}

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

        setErrors(currentErrors => ({
            ...currentErrors,
            [name]: ""
        }));
        setMessage("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validate(values);

        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const response = await onSubmit(values);
            reset();
            setMessage(response.message);
        } catch (e) {
            const error = normalizeError(e);
            console.log(error);
            setErrors(mapServerErrors(error.errors));
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
        reset,
        handleChange,
        handleSubmit
    };
} 

export default useForm;