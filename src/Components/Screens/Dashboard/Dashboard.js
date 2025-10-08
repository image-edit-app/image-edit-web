import { useEffect, useState } from "react";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import CategoryCardComponent from "../../CustomComponents/CategoryCardComponent/CategoryCardComponent";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { useNavigate } from "react-router-dom";
import { apiCall, Spinner } from "../../Utils/AxiosUtils";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import HeaderComponents from "../../CustomComponents/HeaderComponents/HeaderComponents";
export default function Dashboard() {
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        getTemplateData({});
    }, []);
    const getTemplatesCallback = (response) => {
        if (response.status === 200) {
            setTemplates(response.data);
        } else {
            console.error("Failed to fetch templates", response);
        }
    };

    const getTemplateData = ({ category }) => {
        let url = "https://image-edit-backend.vercel.app/api/templates"
        if (category) {
            url += `&categories=${category}`
        } if (subcategory) {
            url += `subcategory=${subcategory}`
        }
        apiCall({
            method: "GET",
            // url: "https://image-edit-backend.vercel.app/api/templates",
            url: url,
            data: {},
            callback: getTemplatesCallback,
            setLoading: setLoading
        });
    };
    const handleSearchFilter = () => {
        getTemplateData({ category });
    }
    const handleResetFilter = () => {
        setCategory('');
        getTemplateData({});
    }
    const handleAddTemplateClick = () => {
        navigate("/add-template");
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            {loading && <Spinner />}
            <div className="w-4/5 p-8">
                <HeaderComponents
                    name="All Templates"
                    label="Add New Template"
                    onClick={handleAddTemplateClick}
                    buttonClassName="py-1 px-3 text-sm font-bold"
                />

                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-5">
                        <InputComponents
                            type="text"
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            inputClassName="w-[190px]"

                        />
                        <InputComponents
                            type="text"
                            placeholder="Enter Subcategory"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            inputClassName="w-[190px] "
                        />
                        <PrimaryButtonComponent
                            label="Search"
                            onClick={handleSearchFilter}
                            buttonClassName="py-1 px-3 text-sm   font-bold"

                        />
                        <PrimaryButtonComponent
                            label="Reset"
                            onClick={handleResetFilter}
                            buttonClassName="py-1 px-3 text-sm font-bold"

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
