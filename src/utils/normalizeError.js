export default function normalizeError(error) {
    if (error.response) {
        const message = 
            error.response.status === 500 
                ? "Something went wrong."
                : error.response.data?.message;

        return {
            type: "server",
            status: error.response.status,
            message,
            errors: error.response.data?.errors || null
        }
    }

    if (error.request) {
        return {
            type: "network",
            status: null,
            message: "Unable to connect to server",
            errors: null
        }   
    }

    return {
        type: "unknown",
        status: null,
        message: "Something went wrong.",
        errors: null
    };
}