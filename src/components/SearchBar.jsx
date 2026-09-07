export default function SearchBar({ value, onHandleSearch, placeholder }) {
    return (
        <div className="pl-6">
            <input 
                className="border rounded p-1 w-[300px]"
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onHandleSearch(e.target.value)}
            />
        </div>
    );
}