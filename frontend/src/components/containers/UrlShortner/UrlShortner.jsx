import { useState } from "react";
import AxiosService from "../../../service/axiosService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AuthService from "../../../service/authService";

const UrlShortner = () => {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        let token = AuthService.getToken();
        if(!token){
            toast.error("You are not logged in");
            navigate('/user/login');
        }
        try {
            AxiosService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await AxiosService.post('url/create', { original_url: url });
            console.log(response.data);
            if(response.status === 200 && response.data.success){
                toast.success("URL shortened successfully!");
                setUrl("");
            } else {
                toast.error(response.data.message || "Failed to shorten URL. Please try again.");
            }
        } catch (error) {
            console.log(error);
            console.log(error.isAxiosError);
            if(error.isAxiosError){
                toast.error(error.response.data.message || "Failed to shorten URL. Please try again.");
            } else {
                toast.error("Failed to shorten URL. Please try again.");
            }
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Submit Your URL
        </h2>

        <form onSubmit={handleSubmit} className="space-y-9">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type Your URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UrlShortner;