import DropdownComponent from "../../CustomComponents/DropdownComponent/DropdownComponent";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { apiCall } from "../../Utils/AxiosUtils";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { useState } from "react";
function AddTemplate() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [templateFileBase64, setTemplateFileBase64] = useState("");
    // const [templateFile, setTemplateFile] = useState(null);
    const categoryOptions = ["Engagement", "Birthday", "Wishes"];
    const subcategoryOptions = ["Invitation", "Party", "Diwali"];
    const planOptions = ["Free", "Paid"];
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setTemplateFileBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };


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
        };
        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/templates",
            data: requestData,
            callback: addTemplatesCallback,
        });
    }

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
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Category"
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Subcategory"
                            options={subcategoryOptions}
                            value={selectedSubcategory}
                            onChange={setSelectedSubcategory}
                        />
                    </div>
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