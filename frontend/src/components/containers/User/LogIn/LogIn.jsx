import { useState } from "react";
import { Link } from "react-router";
import AxiosService from "../../../../service/axiosService"
import AuthService from "../../../../service/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const response = await AxiosService.post('user/login', { email, password });
        console.log(response.data);
        if(response.status === 200 && response.data.success){
            AuthService.setToken(response.data.data.token);
            navigate('/dashboard');
        }
        // Handle successful login, e.g., store token, redirect, etc.
        } catch (error) {
            if(error.isAxiosError && error.response && error.response.data){
                console.log("Login error:" + error.response.data.message);
                toast.error("Login error:" + error.response.data.message);
            } else {
                toast.error("An unexpected error occurred:", error);
            }
        // Handle login error, e.g., show error message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
                Login
            </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/user/signup" className="text-indigo-600 hover:underline">
                Sign up
            </Link>
            </p>
        </div>
        </div>
    );
}

export default LogIn;