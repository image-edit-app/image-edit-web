function InputComponents({ type, label, placeholder, value, onChange, inputClassName, name }) {
    return (
        <div>
            {label && <label className="block mb-1 font-medium">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className={`border px-3 py-2 rounded ${inputClassName}`}
            />
        </div>

    );
}

export default InputComponents;
