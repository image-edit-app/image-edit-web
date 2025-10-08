import { useState } from "react";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { apiCall } from "../../Utils/AxiosUtils";
import { useNavigate } from "react-router-dom";

function AddCategories() {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({ name: "" });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const addCategoryCallback = (response) => {
        if (response.status === 200) {
            console.log("Category added successfully");
            setCategoryData({ name: "" });
            navigate("/categories");
        } else {
            console.log("Failed to add category");
        }
    };

    const addCategory = () => {
        if (categoryData.name.trim() === "") {
            console.log("Please enter category name");
            return;
        }

        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/categories",
            data: categoryData,
            callback: addCategoryCallback,
        });
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="w-4/5 p-6">
                <div className="mb-4">
                    <InputComponents
                        type="text"
                        label="Add Category"
                        name="name"
                        placeholder="Enter Category Name"
                        value={categoryData.name}
                        onChange={handleInputChange}
                        inputClassName="w-[190px]" />
                </div>
                <div>
                    <PrimaryButtonComponent
                        label="Submit"
                        onClick={addCategory}
                        buttonClassName="w-[20%] bg-black text-white px-3 py-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    )
} export default AddCategories;