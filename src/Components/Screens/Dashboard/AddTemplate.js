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
    const [fontStyle, setFontStyle] = useState("");
    const [fontWeight, setFontWeight] = useState("");
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
            font_style: fontStyle,
            font_weight: fontWeight,
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
            <div className="p-8 w-full max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    <div className="flex flex-col">
                        <label className="font-bold mb-2 text-gray-700">Template</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Plan"
                            options={planOptions}
                            value={selectedPlan}
                            onChange={setSelectedPlan}
                            dropdownClassName="w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Category"
                            options={categoriesData}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            dropdownClassName="w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Subcategory"
                            options={subcategoryOptions}
                            value={selectedSubcategory}
                            onChange={setSelectedSubcategory}
                            dropdownClassName="w-full"
                        />
                    </div>
                    <InputComponents
                        type="text"
                        label="Font Family"
                        placeholder="Enter font family"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        inputClassName="w-full"
                    />
                    <InputComponents
                        type="text"
                        label="Font Size"
                        placeholder="Enter font size"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        inputClassName="w-full"
                    />
                    <InputComponents
                        type="text"
                        label="Font Color"
                        placeholder="Enter font color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        inputClassName="w-full"
                    />
                    <InputComponents
                        type="text"
                        label="Font Style"
                        placeholder="Enter font style"
                        value={fontStyle}
                        onChange={(e) => setFontStyle(e.target.value)}
                        inputClassName="w-full"
                    />
                    <InputComponents
                        type="text"
                        label="Font Weight"
                        placeholder="Enter font weight"
                        value={fontWeight}
                        onChange={(e) => setFontWeight(e.target.value)}
                        inputClassName="w-full"
                    />

                    <div className="text-center">
                        <PrimaryButtonComponent
                            label="Submit"
                            buttonClassName="bg-black w-[50%] text-white px-4 py-2 text-sm rounded-md"
                            onClick={addTemplateData}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default AddTemplate;