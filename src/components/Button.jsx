export default function Button({ children, variant, onHandleClick, type, disabled }) {
    return (
        <button type={type} disabled={disabled}
            className="bg-[#f1f1f1] py-1 px-5 rounded-md" 
            onClick={onHandleClick} 
            style={{cursor: "pointer"}}
        >
            {children}
        </button>
    )
}