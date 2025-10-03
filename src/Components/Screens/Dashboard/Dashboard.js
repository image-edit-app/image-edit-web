import { useEffect, useState } from "react";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import CategoryCardComponent from "../../CustomComponents/CategoryCardComponent/CategoryCardComponent";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../Utils/AxiosUtils";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
export default function Dashboard() {
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();

    const getTemplatesCallback = (response) => {
        if (response.status === 200) {
            setTemplates(response.data);
        } else {
            console.error("Failed to fetch templates", response);
        }
    };

    const getTemplateData = () => {
        // let url = "https://image-edit-backend.vercel.app/api/templates"
        // if (category) {
        //     url += `&Category=${category}`
        // } if (subcategory) {
        //     url += `subcategory=${subcategory}`
        // }
        apiCall({
            method: "GET",
            url: "https://image-edit-backend.vercel.app/api/templates",
            // url: url,
            data: {},
            callback: getTemplatesCallback,
        });
    };

    useEffect(() => {
        getTemplateData();
    }, []);
    const handleAddTemplateClick = () => {
        navigate("/add-template");
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">

            <DashboardSideBar />

            <div className="w-4/5 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-bold">All Templates</div>
                    <div>
                        <PrimaryButtonComponent
                            label="Add New Template"
                            buttonClassName="bg-black text-white px-4 py-2 text-sm rounded-md"
                            onClick={handleAddTemplateClick}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-5">
                        <InputComponents
                            type="text"
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            inputClassName="w-[20%]"
                        />
                        <InputComponents
                            type="text"
                            placeholder="Enter Subcategory"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            inputClassName="w-[20%]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {templates.map((cat, i) => (
                        <div key={i} className="cursor-pointer">
                            <CategoryCardComponent img={cat.url} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
