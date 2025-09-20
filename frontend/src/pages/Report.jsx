import { useEffect, useState } from "react";
import { getReports } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      const res = await getReports();
      setReports(res.data.reports || []);
    }
    fetchReports();
  }, []);

  // Handle "Generate Report" click
  const handleGenerateReport = (student) => {
    setSelectedStudent(student);
  };

  // Prepare chart data for selected student
  const chartData =
    selectedStudent?.marks?.map((mark, index) => ({
      test: `Test ${index + 1}`,
      marks: mark,
    })) || [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Performance Reports</h2>

      <table className="table-auto w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Student</th>
            <th className="border px-2 py-1">Average Marks</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.studentId}>
              <td className="border px-2 py-1">{r.name}</td>
              <td className="border px-2 py-1 text-center">{r.avg}</td>
              <td className="border px-2 py-1 text-center">
                <button
                  onClick={() => handleGenerateReport(r)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold mb-4">
            Performance Report: {selectedStudent.name}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
