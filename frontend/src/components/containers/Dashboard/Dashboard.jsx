import { useState } from "react";
const DashBoard = () => {
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
    {
      id: 1,
      original_url: "https://example.com/very/long/url/1",
      short_code: "23",
      shortend_url: "localhost:3000/23",
      clicks: 15,
      created_at: "2026-01-01",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full border-collapse">
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
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-indigo-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{row.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.original_url}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.short_code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.shortend_url}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{row.clicks}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {row.created_at}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button className="text-red-600 hover:text-red-900 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard;