import * as SQLite from "expo-sqlite";

// Use openDatabaseSync for Expo SDK 54
const db = SQLite.openDatabaseSync("offline_learning.db");

export const executeSql = async (query, params = []) => {
  try {
    if (query.trim().toLowerCase().startsWith("select")) {
      const rows = await db.getAllAsync(query, params);
      return { rows: { _array: rows } };
    } else {
      await db.runAsync(query, params);
      return { rows: { _array: [] } };
    }
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};

export const initDB = async () => {
  try {
    console.log("Initializing database...");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson_id INTEGER,
        question TEXT,
        options TEXT,
        correct_index INTEGER
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        lesson_id INTEGER,
        score INTEGER,
        date TEXT
      );
    `);

    console.log("Database initialized successfully ✅");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export default db;

// import * as SQLite from "expo-sqlite";
// import * as Crypto from "expo-crypto";

// const db = SQLite.openDatabaseSync("offline_learning.db");

// // Helper for async SQL
// export const executeSql = (query, params = []) =>
//   new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         query,
//         params,
//         (_, result) => resolve(result),
//         (_, error) => reject(error)
//       );
//     });
//   });

// // Initialize DB and insert initial data
// export const initDB = async () => {
//   try {
//     console.log("Initializing database...");

//     // Users table
//     await executeSql(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         email TEXT UNIQUE,
//         password TEXT
//       );
//     `);

//     // Lessons table
//     await executeSql(`
//       CREATE TABLE IF NOT EXISTS lessons (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT,
//         content TEXT
//       );
//     `);

//     // Quizzes table
//     await executeSql(`
//       CREATE TABLE IF NOT EXISTS quizzes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         lesson_id INTEGER,
//         question TEXT,
//         options TEXT,
//         correct_index INTEGER
//       );
//     `);

//     // Progress table
//     await executeSql(`
//       CREATE TABLE IF NOT EXISTS progress (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         user_id INTEGER,
//         lesson_id INTEGER,
//         score INTEGER,
//         date TEXT
//       );
//     `);

//     // Insert a test user
//     const hashedPassword = await Crypto.digestStringAsync(
//       Crypto.CryptoDigestAlgorithm.SHA256,
//       "123456"
//     );
//     await executeSql(
//       `INSERT OR IGNORE INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
//       [1, "Test User", "test@example.com", hashedPassword]
//     );

//     // Insert sample lessons
//     await executeSql(`
//       INSERT OR IGNORE INTO lessons (id, title, content) VALUES
//       (1, 'Introduction to Spanish', 'Learn basic Spanish greetings and phrases.'),
//       (2, 'Spanish Alphabet', 'Learn how to pronounce each letter of the Spanish alphabet.');
//     `);

//     // Insert sample quizzes
//     await executeSql(`
//       INSERT OR IGNORE INTO quizzes (id, lesson_id, question, options, correct_index) VALUES
//       (1, 1, 'How do you say Hello in Spanish?', '["Hola","Adiós","Gracias","Por favor"]', 0),
//       (2, 1, 'How do you say Thank you in Spanish?', '["Hola","Adiós","Gracias","Por favor"]', 2),
//       (3, 2, 'Which letter is pronounced "a" in Spanish?', '["A","B","C","D"]', 0);
//     `);

//     console.log("Database initialized with sample data ✅");
//   } catch (error) {
//     console.error("Error initializing database:", error);
//   }
// };

// export default db;
