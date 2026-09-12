export default function FormField({ label, name, type, values, errors, onChange, disabled, selectValues }) {
    if (type === "select") 
        return (
            <div className="mb-3">
                <label>{label}: {" "}</label>
                <select 
                    name={name}
                    value={values[name]}
                    onChange={onChange}
                    disabled={disabled}
                    className="border rounded"
                >
                    <option value="">Select {label}</option>
                    {selectValues && selectValues.map(value => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                    ))}
                </select>
                {errors[name] && <p className="text-[red]">{errors[name]}</p>}
            </div>
        );
    

    return (
        <div className="mb-3 flex flex-col">
            <label>{label}: {" "}</label>
            <input 
                type={type}
                name={name}
                value={values[name]}
                onChange={onChange}
                disabled={disabled}
                className="border rounded"
            />
            {errors[name] && <p className="text-[red]">{errors[name]}</p>}
        </div>
    );
}