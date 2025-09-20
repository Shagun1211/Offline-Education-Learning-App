// backend/server.js
import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());


import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "db.json");



// Utility to read DB
async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return { students: [], attendance: [], assignments: [], performance: [] };
  }
}

// Utility to write DB
async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

// ---------------------- Routes ----------------------

// Simple login (hard-coded for prototype)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === "teacher@demo.com" && password === "demo123") {
    return res.json({ success: true, name: "Shagun", token: "demo-token" });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

// Get students


app.get("/api/students", async (req, res) => {
  const db = await readDB();  // readDB reads db.json
  console.log("DB students:", db.students); // add this to debug
  res.json(db.students);
});



// Post attendance
app.post("/api/attendance", async (req, res) => {
  const { date, attendance } = req.body; // attendance = [{id, present}]
  const db = await readDB();
  db.attendance.push({ date, attendance });
  await writeDB(db);
  res.json({ success: true });
});

// Create assignment
app.post("/api/assign", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // validate input
    if (!title || !description || !dueDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const db = await readDB();

    if (!db.assignments) db.assignments = [];

    const id = Date.now(); // unique ID
    db.assignments.push({ id, title, description, dueDate });

    await writeDB(db); // make sure this path is correct

    res.json({ success: true, id });
  } catch (err) {
    console.error("Error in /api/assign:", err);
    res.status(500).json({ success: false, message: "Failed to add assignment" });
  }
});


// Get assignments
app.get("/api/assignments", async (req, res) => {
  const db = await readDB();
  res.json(db.assignments);
});

// Simple reports endpoint (compute average per student)
// Simple reports endpoint (compute average per student)
app.get("/api/reports", async (req, res) => {
  const db = await readDB();
  const reports = db.performance.map((p) => {
    const avg = p.marks.reduce((a, b) => a + b, 0) / p.marks.length;
    const student = db.students.find((s) => s.id === p.studentId) || { name: "Unknown" };

    return {
      studentId: p.studentId,
      name: student.name,
      avg: Math.round(avg),
      marks: p.marks   //  send marks array too
    };
  });

  res.json({ reports });
});


// ---------------------- Start Server ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));
