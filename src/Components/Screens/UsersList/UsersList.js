import React, { useEffect, useState } from "react";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import TableComponent from "../../CustomComponents/TableComponent/TableComponent";
import { apiCall } from "../../Utils/AxiosUtils";

function UsersList() {
    const [users, setUsers] = useState([]);
    const headers = [
        "profile",
        "name",
        "email",
        "plan",
        "joinedDate",
        "templatesUsed",
        "contactNumber",
        "firmName",
        "gender",
        "dob",
        "address"
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
                email: user.email,
                plan: user.subscription_details,
                templatesUsed: user.templatesUsed, 
                contactNumber: user.contact_number,
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
                <h2 className="text-2xl font-bold mb-6">Users List</h2>
                <TableComponent
                    headers={headers}
                    data={users}
                />
            </div>
        </div>

    );
}

export default UsersList;
