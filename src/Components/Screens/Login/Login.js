import { useNavigate } from "react-router-dom";
import InputComponents from "../../CustomComponents/InputComponents/InputComponents";
import PrimaryButtonComponent from "../../CustomComponents/PrimaryButtonComponent/PrimaryButtonComponent";

function Login() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/dashboard");
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
                <div className="text-3xl font-bold text-white text-center mb-8">
                    Welcome To Image Editor
                </div>

                <InputComponents
                    type="text"
                    placeholder="Mobile No" />
                <InputComponents
                    type="text"
                    placeholder="Password" />

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
