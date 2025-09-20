import { useEffect, useState } from "react";
import { getStudents, postAttendance } from "../api/api";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // {id: true/false}
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Fetch students from backend
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await getStudents();
        setStudents(res.data);

        // initialize attendance as present (true) for all
        const initAttendance = {};
        res.data.forEach((s) => (initAttendance[s.id] = true));
        setAttendance(initAttendance);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    }
    fetchStudents();
  }, []);

  // Toggle student attendance
  const toggleAttendance = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Save attendance
  const handleSubmit = async () => {
    const attArray = students.map((s) => ({
      id: s.id,
      present: attendance[s.id],
    }));

    try {
      await postAttendance(date, attArray);
      alert("✅ Attendance saved successfully!");
    } catch (err) {
      console.error("Failed to save attendance:", err);
      alert("❌ Failed to save attendance");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Mark Attendance
      </h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="mr-2 font-medium text-gray-600">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Student Name</th>
              <th className="border p-2 text-center">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={attendance[s.id] || false}
                      onChange={() => toggleAttendance(s.id)}
                      className="w-5 h-5 accent-green-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow transition-colors duration-200"
      >
        Save Attendance
      </button>
    </div>
  );
}
