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
    const headers = ["name", "action"];
    const handleAddClick = () => {
        navigate("/add-category");
    };
    const getCategoriesCallback = (response) => {
        if (response.status === 200) {
            const updated = response.data.map((category) => ({
                ...category,
                action: (
                    <div
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        title="Edit"
                        onClick={() => navigate(`/add-category/${category._id}`)}
                    >
                        <i className="fa fa-pencil text-gray-700 text-sm" />
                    </div>
                ),
            }));
            setCategories(updated);
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
                    icon="fa fa-plus-circle"
                    name="Categories"
                    onClick={handleAddClick}
                    buttonClassName="py-1 px-3 text-sm font-bold"
                />
                <div className="w-full p-8">
                    <TableComponent
                        headers={headers}
                        data={categories}
                        onRowClick={(row) => {
                            console.log("Clicked row:", row);
                        }} />

                </div>

            </div>
        </div>
    );
}
export default Categories;
