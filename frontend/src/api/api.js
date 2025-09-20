import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const login = (email, password) => API.post("/login", { email, password });
export const getStudents = () => API.get("/students");
export const postAttendance = (date, attendance) => API.post("/attendance", { date, attendance });
export const getAssignments = () => API.get("/assignments");

export const createAssignment = (title, description, dueDate) =>
  API.post("/assign", { title, description, dueDate });

export const getReports = () => API.get("/reports");
