import React, { useEffect, useState } from "react";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import TableComponent from "../../CustomComponents/TableComponent/TableComponent";
import { apiCall } from "../../Utils/AxiosUtils";
import HeaderComponents from "../../CustomComponents/HeaderComponents/HeaderComponents";

function UsersList() {
    const [users, setUsers] = useState([]);
    const headers = [
        "profile",
        "name",
        // "joinedDate",
        "contact Number",
        // "firmName",
        // "gender",
        // "dob",
        // "address"
        "role",
        "plan",
    ];

    // const users = [
    //     {
    //         profile: "Basic User",
    //         name: "John Doe",
    //         email: "john@example.com",
    //         plan: "Free",
    //         joinedDate: "02-09-2025",
    //         templatesUsed: 5,
    //         contactNumber: "2637273737",
    //         firmName: "Doe Industries",
    //         gender: "Male",
    //         dob: "01-01-1990",
    //         address: "123 Main Street"
    //     },
    //     {
    //         profile: "Premium User",
    //         name: "Jane Smith",
    //         email: "jane@example.com",
    //         plan: "Paid",
    //         joinedDate: "15-08-2025",
    //         templatesUsed: 22,
    //         contactNumber: "7656746362",
    //         firmName: "Smith Solutions",
    //         gender: "Female",
    //         dob: "12-12-1988",
    //         address: "456 Oak Avenue"
    //     },
    // ];
    const getUsersCallback = (response) => {
        if (response.status === 200) {
            const usersFormattedRows = response.data.map((user) => ({
                profile: user.role,
                name: user.name,
                plan: user.subscription_details,
                contactNumber: user.contactnumber,
                firmName: user.firm_name,
                gender: user.gender,
                address: user.address,
                id: user.id
            }));
            setUsers(usersFormattedRows);
        } else {
            console.error("Failed to fetch users", response);
        }
    };
    const getUsers = () => {
        apiCall({
            method: "GET",
            url: "https://image-edit-backend.vercel.app/api/users",
            data: {},
            callback: getUsersCallback,
        });
    };
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DashboardSideBar />
            <div className="w-4/5 p-8">
                <HeaderComponents
                    name="Users List"
                />

                <TableComponent
                    headers={headers}
                    data={users}
                />
            </div>
        </div>

    );
}

export default UsersList;
