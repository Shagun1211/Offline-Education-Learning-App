import { useState, useEffect } from "react";
import { getAssignments, createAssignment } from "../api/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Fetch existing assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await getAssignments();
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  // Handle adding new assignment
  const handleAdd = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await createAssignment(title, description, dueDate);
      setAssignments((prev) => [
        ...prev,
        { id: res.data.id, title, description, dueDate },
      ]);
      setTitle("");
      setDescription("");
      setDueDate("");
      alert("Assignment added successfully!");
    } catch (err) {
      console.error("Failed to add assignment:", err);
      alert("Failed to add assignment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Assignments</h2>

      {/* Add Assignment Form */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleAdd}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow transition-colors duration-200"
      >
        Add Assignment
      </button>

      {/* Assignments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-center">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border p-2">{a.title}</td>
                  <td className="border p-2">{a.description}</td>
                  <td className="border p-2 text-center">{a.dueDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
