import { useState } from "react";

function DropdownComponent({ label, options = [], value = [], onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (option) => {
        if (value.includes(option)) {
            onChange(value.filter((item) => item !== option));
        } else {
            onChange([...value, option]);
        }
    };

    return (
        <div className="relative w-full">
            <label className="font-semibold mb-1 block">{label}</label>
            <div
                className="mt-2 p-2 border border-gray-300 rounded bg-white cursor-pointer"
                onClick={toggleDropdown}
            >
                {value.length > 0 ? value.join(", ") : `Select ${label}`}
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow">
                    {options.map((option, idx) => (
                        <label
                            key={idx}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={value.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownComponent;
