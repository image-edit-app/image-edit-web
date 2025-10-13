
import { useNavigate } from "react-router-dom";
import PrimaryButtonComponent from '../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent';


function DashboardSideBar() {
    const navigate = useNavigate();

    return (
        <div className="w-1/5 shadow-md py-6 px-4 flex flex-col justify-between bg-black h-screen">
            <div className="flex flex-col space-y-4 items-start">
                <PrimaryButtonComponent
                    label="Dashboard"
                    buttonClassName="bg-white text-gray-800 hover:bg-gray-300"
                    onClick={() => navigate("/dashboard")}
                />
                <PrimaryButtonComponent
                    label="Users List"
                    buttonClassName="bg-white text-gray-800 hover:bg-gray-300"
                    onClick={() => navigate("/users")}
                />
                <PrimaryButtonComponent
                    label="Subscription Plans"
                    buttonClassName="bg-white text-gray-800 hover:bg-gray-300"
                    onClick={() => navigate("/plans")}
                />
                <PrimaryButtonComponent
                    label="Categories"
                    buttonClassName="bg-white text-gray-800 hover:bg-gray-300"
                    onClick={() => navigate("/Categories")}
                />
                <PrimaryButtonComponent
                    label="Subcategories"
                    buttonClassName="bg-white text-gray-800 hover:bg-gray-300"
                    onClick={() => navigate("/subcategories")}
                />
            </div>
            <div>
                <PrimaryButtonComponent
                    label="Logout"
                    icon="fa fa-sign-out"
                    buttonClassName="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => {
                        navigate("/logout");
                    }}
                />
            </div>
        </div>

    );
}

export default DashboardSideBar;
