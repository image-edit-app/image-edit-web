import HeaderComponents from "../../CustomComponents/HeaderComponents/HeaderComponents";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";

function SubscriptionPlans() {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            duration: "Lifetime",
            description: "Basic templates only",
            features: [
                "Access to basic templates",
                "Limited exports",
                "Watermarked downloads",
            ],
        },
        {
            name: "Silver",
            price: "₹99",
            duration: "1 Month",
            description: "Unlock more templates",
            features: [
                "Access to basic + premium templates",
                "Unlimited exports",
                "No watermarks",
            ],
        },
        {
            name: "Gold",
            price: "₹249",
            duration: "3 Months",
            description: "Full access to all templates",
            features: [
                "All templates unlocked",
                "Priority support",
                "Ad-free experience",
                "Team collaboration",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="w-4/5 p-8">
                <HeaderComponents
                    name="Subscription Plans"
                    label="Add New Plan"
                    buttonClassName="bg-black text-white px-4 py-2 text-sm rounded-md"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-xl font-bold mb-2">{plan.name}</div>
                                <div className="text-gray-700 text-sm mb-1">
                                    <strong>Price:</strong> {plan.price}
                                </div>
                                <div className="text-gray-700 text-sm mb-1">
                                    <strong>Duration:</strong> {plan.duration}
                                </div>
                                <div className="text-gray-700 text-sm mb-3">
                                    <strong>Description:</strong> {plan.description}
                                </div>

                                <div className="mb-3">
                                    <strong className="text-sm text-gray-800">Features:</strong>
                                    <ul className="list-disc ml-5 mt-1 text-sm text-gray-600 space-y-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <PrimaryButtonComponent
                                label="Edit"
                                buttonClassName="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 mt-2"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlans;
