function PrimaryButtonComponent({ label, buttonClassName, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-3 bg-black text-white text-sm font-bold rounded items-center${buttonClassName}`}
        >
            {label}
        </button>
    );
}

export default PrimaryButtonComponent;
