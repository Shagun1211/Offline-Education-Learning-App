import { useState } from "react";
import Assignments from "./Assignment.jsx";
import Attendance from "./Attendence.jsx";
import Reports from "./Report.jsx";

export default function Dashboard({ teacherName }) {
  const [activeTab, setActiveTab] = useState("assignments");

  const tabs = [
    { id: "assignments", label: "Assignments" },
    { id: "attendance", label: "Attendance" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Welcome, {teacherName}
        </h1>
        <div className="text-gray-600">Teacher Dashboard</div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-white border-t border-l border-r border-gray-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">
        {activeTab === "assignments" && <Assignments />}
        {activeTab === "attendance" && <Attendance />}
        {activeTab === "reports" && <Reports />}
      </div>
    </div>
  );
}
