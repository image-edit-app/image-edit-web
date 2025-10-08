import { useNavigate } from "react-router-dom";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import TableComponent from "../../CustomComponents/TableComponent/TableComponent";
import { apiCall, Spinner } from "../../Utils/AxiosUtils";
import { useEffect, useState } from "react";
import HeaderComponents from "../../CustomComponents/HeaderComponents/HeaderComponents";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const headers = ["name"];
    const handleAddClick = () => {
        navigate("/add-category");
    };
    const getCategoriesCallback = (response) => {
        if (response.status === 200) {
            setCategories(response.data);
        } else {
            console.log("Failed to fetch categories");
        }
    };
    const getCategories = () => {
        apiCall({
            method: "GET",
            url: "https://image-edit-backend.vercel.app/api/categories",
            callback: getCategoriesCallback,
            setLoading: setLoading
        });
    };

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            {loading && <Spinner />}
            <div className="w-4/5 p-8">
                <HeaderComponents
                    label="Add Category"
                    name="Categories"
                    onClick={handleAddClick}
                    buttonClassName="py-1 px-3 text-sm font-bold"
                />
                <div className="w-full p-8">
                    <TableComponent
                        headers={headers}
                        data={categories} />

                </div>

            </div>
        </div>
    );
}

export default Categories;
