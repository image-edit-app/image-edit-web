
import PrimaryButtonComponent from "../PrimaryButtonComponent/PrimaryButtonComponent";
export default function HeaderComponents({ name, label, onClick, buttonClassName = "" }) {
    return (
        <div className="flex justify-between items-center">
            <div className="text-xl font-serif">{name}</div>
            <PrimaryButtonComponent
                label={label}
                onClick={onClick}
                buttonClassName={buttonClassName}
            />
        </div>
    );
}