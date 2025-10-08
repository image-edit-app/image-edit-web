import { useNavigate } from "react-router-dom";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";
import { apiCall, Spinner } from "../../Utils/AxiosUtils";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)
    const [loginFormData, setLoginFormData] = useState({
        contact_number: "",
        password: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const loginCallback = (response) => {
        if (response.status === 200) {
            navigate("/dashboard");
        } else {
            console.log("login failed");
        }
    };

    const handleLoginClick = () => {
        apiCall({
            method: "POST",
            url: "https://image-edit-backend.vercel.app/api/users/login",
            data: loginFormData,
            callback: loginCallback,
            setLoading:setLoading
        });
    };
    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://tse2.mm.bing.net/th/id/OIP.ur15SJFBlz4q4UdV9IZ3FgHaE5?rs=1&pid=ImgDetMain&o=7&rm=3')",
            }}
        >
            <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-2xl w-full max-w-lg mx-4">
                 {loading && <Spinner />}
                <div className="text-3xl font-bold text-white text-center mb-8">
                    Welcome To Image Editor
                </div>

                <InputComponents
                    type="text"
                    name="contact_number"
                    placeholder="Mobile No"
                    inputClassName="w-full"
                    value={loginFormData.contact_number}
                    onChange={handleInputChange} />
                <InputComponents
                    type="text"
                    name="password"
                    placeholder="Password"
                    inputClassName="w-full mt-4 mb-4"
                    value={loginFormData.password}
                    onChange={handleInputChange} />

                <PrimaryButtonComponent
                    label="Log In"
                    onClick={handleLoginClick}
                    buttonClassName="w-full py-4 text-lg bg-blue-600 text-white font-serif font-bold rounded-lg hover:bg-blue-700 transition duration-200"
                />
            </div>
        </div>
    );
}

export default Login;
