function InputComponents({ type, placeholder, value, onChange, inputClassName,name }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={`border px-4 py-3 rounded ${inputClassName}`}
        />
    );
}

export default InputComponents;
