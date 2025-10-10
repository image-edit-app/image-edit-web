function PrimaryButtonComponent({ label, buttonClassName, onClick, icon, iconPosition = "left" }) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-3 bg-black text-white text-sm font-bold rounded items-center${buttonClassName}`}
        >
            {icon && iconPosition === "left" && <i className={icon} aria-hidden="true"></i>}
            <span>{label}</span>
            {icon && iconPosition === "right" && <i className={icon} aria-hidden="true"></i>}
        </button>
    );
}

export default PrimaryButtonComponent;
