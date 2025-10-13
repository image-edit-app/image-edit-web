import DropdownComponent from "../../CustomComponents/DropdownComponent/DropdownComponent";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { apiCall } from "../../Utils/AxiosUtils";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { useEffect, useState } from "react";
function AddTemplate() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [templateFileBase64, setTemplateFileBase64] = useState("");
    const [categoriesData, setCategoriesData] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const planOptions = ["Free", "Paid"];
    const [fontFamily, setFontFamily] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [fontColor, setFontColor] = useState("");
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setTemplateFileBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        getCategoriesData();
        getSubcategoriesData();
    }, []);
    const addTemplatesCallback = (response) => {
        console.log('response: ', response);
        if (response.status === 200) {
            console.log("Template added successfully!");
        } else {
            console.log("Failed to add template.");
        };
    }
    const addTemplateData = () => {
        console.log("Submitting data:");
        console.log("Plan:", selectedPlan);
        console.log("Category:", selectedCategory);
        console.log("Subcategory:", selectedSubcategory);
        console.log("Template base64:", templateFileBase64);
        const requestData = {
            paid: selectedPlan === "Paid",
            categories: selectedCategory || "",
            sub_categories: selectedSubcategory || "",
            url: templateFileBase64 || "",
            font_family: fontFamily,
            font_size: fontSize,
            font_color: fontColor,
        };
        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/templates",
            data: requestData,
            callback: addTemplatesCallback,
        });
    }
    const getCategoriesData = () => {
        let url = "https://image-edit-backend.vercel.app/api/categories";
        apiCall({
            method: 'GET',
            url: url,
            data: {},
            callback: getCategoriesCallback,
        });
    };
    const getCategoriesCallback = (response) => {
        console.log('response: ', response);
        if (response.status === 200) {
            const categories = response.data.map(category => category.name);
            setCategoriesData(categories);
            console.log('categories: ', categories);
        } else {
            console.log("Error fetching categories");
        }
    };
    const getSubcategoriesData = () => {
        let url = "https://image-edit-backend.vercel.app/api/sub-categories";
        apiCall({
            method: 'GET',
            url: url,
            data: {},
            callback: getSubcategoriesCallback,
        });
    };

    const getSubcategoriesCallback = (response) => {
        if (response.status === 200) {
            const subcategories = response.data.map(subcategory => subcategory.name);
            setSubcategoryOptions(subcategories);
            console.log('subcategories: ', subcategories);
        } else {
            console.log("Error fetching subcategories");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="p-6 w-full">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                        <div className="flex flex-col">
                            <label className="font-serif font-bold mb-1">Template File</label>
                            <input
                                type="file"
                                name="template"
                                onChange={handleFileChange}
                                className="border p-2 rounded w-[80%]"
                            />
                        </div>
                        <DropdownComponent
                            label="Plan"
                            options={planOptions}
                            value={selectedPlan}
                            onChange={setSelectedPlan}
                            dropdownClassName="w-[80%]"
                            labelClassName="font-serif font-bold"
                        />
                        <DropdownComponent
                            label="Category"
                            options={categoriesData}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            dropdownClassName="w-[80%]"
                            labelClassName="font-serif font-bold"
                        />
                        <DropdownComponent
                            label="Subcategory"
                            options={subcategoryOptions}
                            value={selectedSubcategory}
                            onChange={setSelectedSubcategory}
                            dropdownClassName="w-[80%]"
                            labelClassName="font-serif font-bold"
                        />
                        <InputComponents
                            type="text"
                            label="Font Family"
                            placeholder="Enter font family"
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            inputClassName="w-[80%]"
                            labelClassName="font-serif font-bold"

                        />
                        <InputComponents
                            type="text"
                            label="Font Size"
                            placeholder="Enter font size"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            inputClassName="w-[80%]"
                            labelClassName="font-serif font-bold"

                        />
                        <InputComponents
                            type="text"
                            label="Font Color"
                            placeholder="Enter font color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                            inputClassName="w-[80%]"
                            labelClassName="font-serif font-bold"

                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <PrimaryButtonComponent
                            label="Submit"
                            buttonClassName="bg-black text-white px-6 py-2 text-sm rounded-md"
                            onClick={addTemplateData}
                        />
                    </div>

                </div>
            </div>
        </div>

    );
}
export default AddTemplate;