function InputComponents({ type,label, placeholder, value, onChange, inputClassName,name }) {
    return (
        <input
            type={type}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={`border px-4 py-3 rounded ${inputClassName}`}
        />
    );
}

export default InputComponents;
