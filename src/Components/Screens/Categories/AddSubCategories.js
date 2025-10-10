import { useNavigate } from "react-router-dom";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents"
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent"
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar"
import { apiCall } from "../../Utils/AxiosUtils";
import { useEffect, useState } from "react";
import DropdownComponent from "../../CustomComponents/DropdownComponent/DropdownComponent";

function AddSubCategories() {
    const navigate = useNavigate();
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        category: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubCategoryData({ ...subCategoryData, [name]: value });
    };
    const [categoriesData, setCategoriesData] = useState([]);
    useEffect(() => {
        getCategoriesData();
    }, []);

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


    const addSubCategoryCallback = (response) => {
        if (response.status === 200) {
            console.log("SubCategory added successfully");
            setSubCategoryData({ name: "", category: "" });
            navigate("/subcategories");
        } else {
            console.log("Failed to add subcategory");
        }
    };

    const addSubCategory = () => {
        if (subCategoryData.name.trim() === ""
            // ||
            // subCategoryData.category_name.trim() === ""
        ) {
            console.log("Please enter subcategory name");
            return;
        }

        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/sub-categories",
            data: subCategoryData,
            callback: addSubCategoryCallback,
        });
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="w-4/5 p-6">
                <div className="mb-4">
                    <DropdownComponent
                        label="Add Category"
                        options={categoriesData}
                        value={subCategoryData.category}
                        onChange={(selectedValue) =>
                            setSubCategoryData({ ...subCategoryData, category: selectedValue })
                        }
                        dropdownClassName="w-[190px]"
                    />
                </div>
                <div className="mb-4">
                    <InputComponents
                        label="Add Subcategory"
                        type="text"
                        name="name"
                        placeholder="SubCategory"
                        value={subCategoryData.name}
                        onChange={handleInputChange}
                        inputClassName="w-[190px]"
                    />
                </div>
                <div>
                    <PrimaryButtonComponent
                        label="Submit"
                        onClick={addSubCategory}
                        buttonClassName="w-[20%] bg-black text-white px-3 py-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    )
} export default AddSubCategories;