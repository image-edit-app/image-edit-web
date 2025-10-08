import { useNavigate } from "react-router-dom";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { apiCall, Spinner } from "../../Utils/AxiosUtils";
import { useEffect, useState } from "react";
import TableComponent from "../../CustomComponents/TableComponent/TableComponent";
import HeaderComponents from "../../CustomComponents/HeaderComponents/HeaderComponents";

function SubCategories() {
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate("/add-subcategory");
    };
    const [subCategories, setSubCategories] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false)

    const headers = ["name", "category"];
    const getCategoriesData = () => {
        const url = "https://image-edit-backend.vercel.app/api/categories";
        apiCall({
            method: "GET",
            url: url,
            data: {},
            callback: getCategoriesCallback,
        });
    };

    const getCategoriesCallback = (response) => {
        if (response.status === 200) {
            const categories = response.data.map(category => category.name);
            setCategoriesData(categories);
        } else {
            console.log("Error fetching categories");
        }
    };
    const getSubCategoriesCallback = (response) => {
        if (response.status === 200) {
            const subcategories = response.data.map(subcategory => ({
                ...subcategory,
                category: subcategory.category?.name || "N/A",
            }));
            setSubCategories(subcategories);
        } else {
            console.log("Failed to fetch subcategories");
        }
    };
    const getSubCategories = () => {
        apiCall({
            method: "GET",
            url: "https://image-edit-backend.vercel.app/api/sub-categories",
            data: {},
            callback: getSubCategoriesCallback,
            setLoading: setLoading
        });
    };
    useEffect(() => {
        getSubCategories();
        getCategoriesData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            {loading && <Spinner />}
            <div className="w-4/5 p-8">
                <HeaderComponents
                    label="Add SubCategory"
                    name="SubCategories"
                    onClick={handleAddClick}
                    buttonClassName="py-1 px-3 text-sm font-bold"
                />
                <div className="w-full p-8">
                    <TableComponent
                        headers={headers}
                        data={subCategories} />

                </div>

            </div>
        </div>
    )
} export default SubCategories;