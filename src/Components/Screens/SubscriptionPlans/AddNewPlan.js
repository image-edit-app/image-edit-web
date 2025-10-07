import { useNavigate } from "react-router-dom";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import { useState } from "react";
import { apiCall } from "../../Utils/AxiosUtils";
import DropdownComponent from "../../CustomComponents/DropdownComponent/DropdownComponent";
import CustomDropdownComponent from "../../CustomComponents/CustomDropdownComponent/CustomDropdownComponent";

function AddNewPlan() {
    const navigate = useNavigate();
    const statusOptions = ["Active", "Inactive"];
    const [subscriptionPlan, setSubscriptionPlan] = useState({
        name: "",
        price: "",
        duration: "",
        description: "",
        status: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionPlan({ ...subscriptionPlan, [name]: value });
    };
    const addPlanCallback = (response) => {
        if (response.status === 200) {
            console.log("Plan added successfully");
            setSubscriptionPlan({
                name: "",
                price: "",
                duration: "",
                description: "",
                status: "",
            });
            navigate("/plans");
        } else {
            console.log("Failed to add plan");
        }
    };

    const handleSubmit = () => {
        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/subscription-plans",
            data: subscriptionPlan,
            callback: addPlanCallback,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="p-8 w-full max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    <div className="flex flex-col">
                        <InputComponents
                            name="name"
                            type="text"
                            placeholder="Plan Name"
                            value={subscriptionPlan.name}
                            onChange={handleInputChange}
                            inputClassName="border px-3 py-2 rounded w-full"

                        />
                    </div>
                    <div className="flex flex-col" >
                        <InputComponents
                            name="price"
                            type="text"
                            placeholder="Price"
                            value={subscriptionPlan.price}
                            onChange={handleInputChange}
                            inputClassName="border px-3 py-2 rounded  w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponents
                            name="duration"
                            type="text"
                            placeholder="Duration"
                            value={subscriptionPlan.duration}
                            onChange={handleInputChange}
                            inputClassName="border px-3 py-2 rounded  w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponents
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={subscriptionPlan.description}
                            onChange={handleInputChange}
                            inputClassName="border px-3 py-2 rounded  w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <CustomDropdownComponent
                            name="status"
                            options={statusOptions}
                            value={subscriptionPlan.status}
                            onChange={handleInputChange}
                            placeholder="Select status"
                            className="w-full"
                        />

                    </div>
                    <div className="flex flex-col">
                        <PrimaryButtonComponent
                            label="Submit"
                            onClick={handleSubmit}
                            buttonClassName="w-[20%] bg-black text-white px-3 py-2 rounded-md  w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
} export default AddNewPlan;