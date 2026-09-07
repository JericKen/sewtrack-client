export default function PageHeader({ title, buttonText, onHandleAdd, createLoading}) {
    return (
        <div className="flex justify-between items-center p-6 mb-6 bg-[#f1f1f1] shadow">
            <h3 className="">{title}</h3>
            <button     
                className="py-1 px-4 bg-black rounded-lg text-white "
                onClick={onHandleAdd}
            >
                {createLoading ? "..." : buttonText}
            </button>
        </div>
    );
}