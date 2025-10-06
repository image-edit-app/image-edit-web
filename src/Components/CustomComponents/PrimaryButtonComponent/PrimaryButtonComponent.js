function PrimaryButtonComponent({ label, buttonClassName, onClick }) {
    return (
        <button
            onClick={onClick}
            className={` py-4 text-lg font-serif font-bold rounded-lg transition duration-200 ${buttonClassName}`}
        >
            {label}
        </button>
    );
}

export default PrimaryButtonComponent;
