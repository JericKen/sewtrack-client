import FormField from "../components/FormField";
import Button from "../components/ui/Button";
import useForm from "../hooks/useForm";
import { loginUser } from "../services/authService";

const INITIAL_VALUE = {
    email: "",
    password: ""
}

function validate(values) {
    const { email, password } = values;
    const errors = {
        email: "",
        password: ""
    };

    if (email.trim() === "") {
        errors.email = "Email is required.";
    } else if (email.trim().length < 6) {
        errors.email = "Email must be at least 6 characters."
    }

    if (password.trim() === "") {
        errors.password = "Password is required.";
    } else if (password.trim().length < 8) {
        errors.password = "Password must be at least 8 characters."
    }

    return errors;
}

function Login() {
    const {
        values,
        errors,
        loading,
        message,
        handleChange,
        handleSubmit
    } = useForm({
        initialValue: INITIAL_VALUE,
        validate,
        onSubmit: handleSubmitLogin
    });

    async function handleSubmitLogin(credentials) {
        const response = await loginUser(credentials);
        return response;
    }

    return (
        <div className="grid grid-cols-[1.15fr_1fr] h-screen">
            <div className="bg-[#1B1B18]"></div>
            <div className="bg-[#EFECE3] flex justify-center items-center p-[40px]">
                <div className="w-100">
                    <form action="" onSubmit={handleSubmit}>
                        <FormField
                            label="Email"
                            name="email"
                            type="text" 
                            errors={errors}
                            values={values}
                            onChange={handleChange}
                        />
                        <FormField
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors}
                            values={values}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            variant="accent"
                            className="w-100 p-1 bg-[#2F5D53]"
                        >
                            {loading
                            ? "Logging in..."
                            : "Login"
                            }
                        </Button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    )
}

export default Login;