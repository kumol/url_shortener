import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthService from "../../../service/authService";
import AxiosService from "../../../service/axiosService";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const DashBoard = () => {
    const navigate = useNavigate();
  const columns = [
    "ID",
    "Original URL",
    "Short Code",
    "Shortened URL",
    "Clicks",
    "Created At",
    "Actions",
  ];

  const [data, setData] = useState([
    
  ]);

  useEffect(() => {
    let user = AuthService.getUser();
    if(!user){
        navigate('/user/login');
    }
    async function fetchData() {
        try {
            let token = AuthService.getToken();
            if(!token){
                toast.error("You are not logged in");
                navigate('/user/login');
            }
            AxiosService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await AxiosService.get('url/stats');
            console.log(response.data);
            if(response.status === 200 && response.data.success){
                setData(response.data.data);
            }
        } catch (error) {
            if(error.isAxiosError && error.response.status === 401){
                AuthService.removeToken();
                navigate('/user/login');
            }
            if(error.isAxiosError && error.response.status === 404){
                toast.warning(error.response.data.message || "No URL stats found");
            }
        }
    }
    fetchData();
  }, []);

  const deleteHandler = async(id) => {
    try {
        let token = AuthService.getToken();
        if(!token){
            toast.error("You are not logged in");
            navigate('/user/login');
        }
        AxiosService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await AxiosService.delete(`url/delete/${id}`);
        if(response.status === 200 && response.data.success){
            toast.success("URL deleted successfully!");
            setData(data.filter(item => item.id !== id));
        }
    } catch (error) {
        toast.error(error.message || "Failed to delete URL");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No shortened URLs found. Please create one.
          </div>
        ) : (<table className="min-w-full border-collapse">
          <thead className="bg-indigo-600">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((url) => (
              <tr
                key={url.id}
                className="hover:bg-indigo-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{url.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{url.original_url}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{url.short_code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{url.shortend_url}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{url.clicks}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {moment(url.created_at).format("YYYY-MM-DD")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button onClick={()=>deleteHandler(url.id)} className="text-red-600 hover:text-red-900 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>
    </div>
  );
}

export default DashBoard;