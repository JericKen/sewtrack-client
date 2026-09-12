import "./Button.css";

export default function Button({ 
    children, 
    variant = "primary", 
    onHandleClick, 
    type = "button", 
    disabled = false,
    className = ""
}) {
    return (
        <button 
            type={type} 
            disabled={disabled}
            className={`btn btn-${variant} ${className}`}
            onClick={onHandleClick} 
        >
            {children}
        </button>
    )
}