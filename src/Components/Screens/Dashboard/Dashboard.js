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
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 4;
    const navigate = useNavigate();
    useEffect(() => {
        // getTemplateData({});
        getTemplateData({ category: "", subcategory: "", offset: 0 });
    }, []);
    const getTemplatesCallback = (response,offsetValue) => {
        if (response.status === 200) {
            const newTemplates = response.data || [];
            if (offsetValue === 0) {
                setTemplates(newTemplates);
            } else {
                setTemplates((prev) => [...prev, ...newTemplates]);
            }
            setHasMore(newTemplates.length === limit);
            setOffset(offsetValue + newTemplates.length);
        } else {
            console.error("Failed to fetch templates", response);
        }
    };

    const getTemplateData = ({ category, subcategory, offset = 0 }) => {
        // let url = "https://image-edit-backend.vercel.app/api/templates?";
        let url = `https://image-edit-backend.vercel.app/api/templates?limit=${limit}&offset=${offset}`;
        // if (category) {
        //     url += `category=${category}&`;
        // }
        // if (subcategory) {
        //     url += `sub_category=${subcategory}`;
        // }
        if (category) url += `&category=${category}`;
        if (subcategory) url += `&sub_category=${subcategory}`;
        apiCall({
            method: "GET",
            // url: "https://image-edit-backend.vercel.app/api/templates",
            url: url,
            data: {},
            // callback: getTemplatesCallback,
            callback: (response) => getTemplatesCallback(response, offset),
            setLoading: setLoading
        });
    };
    const handleSearchFilter = () => {
        setOffset(0);
        setHasMore(true);
        setTemplates([]);
        getTemplateData({ category, subcategory, offset: 0 });
        // getTemplateData({ category, subcategory });
    };

    const handleResetFilter = () => {
        setCategory('');
        setSubcategory('');
        setOffset(0);
        setHasMore(true);
        setTemplates([]);
        getTemplateData({ category: "", subcategory: "", offset: 0 });
        // getTemplateData({});
    };

    const handleAddTemplateClick = () => {
        navigate("/add-template");
    };
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
            getTemplateData({ category, subcategory, offset });
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            {loading && <Spinner />}
            <div className="w-4/5 p-8">
                <HeaderComponents
                    name="All Templates"
                    icon="fa fa-plus-circle"
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
                            icon="fa fa-search"
                            onClick={handleSearchFilter}
                            buttonClassName="py-1 px-3 text-sm font-bold"

                        />
                        <PrimaryButtonComponent
                            label="Reset"
                            icon="fa fa-refresh"
                            onClick={handleResetFilter}
                            buttonClassName="py-1 px-3 text-sm font-bold"

                        />
                    </div>
                </div>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 h-[70vh] overflow-y-auto">
                    {templates.map((cat, i) => (
                        <div key={i} className="cursor-pointer">
                            <CategoryCardComponent img={cat.url} />
                        </div>
                    ))}
                </div> */}
                <div
                    onScroll={handleScroll}
                    className="h-[24vh] overflow-y-auto"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                        {templates.map((cat, i) => (
                            <div key={i} className="cursor-pointer">
                                <CategoryCardComponent img={cat.url} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}
