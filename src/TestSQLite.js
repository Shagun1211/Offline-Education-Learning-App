import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import * as SQLite from "expo-sqlite";

export default function TestSQLite() {
  const [status, setStatus] = useState("Testing SQLite...");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function testDB() {
      try {
        const db = SQLite.openDatabaseSync("test.db");
        console.log("✅ Database opened successfully");

        // Create + clear
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);"
        );
        await db.execAsync("DELETE FROM test;");

        // Insert (using runAsync instead of execAsync)
        await db.runAsync("INSERT INTO test (value) VALUES (?);", ["Hello SQLite!"]);

        // Fetch
        const allRows = await db.getAllAsync("SELECT * FROM test");
        console.log("📊 Table contents:", allRows);

        setRows(allRows);
        setStatus(`✅ SQLite is working! Found ${allRows.length} rows`);
      } catch (error) {
        console.error("❌ SQLite test failed:", error);
        setStatus("❌ SQLite test failed: " + error.message);
      }
    }

    testDB();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>{status}</Text>
      <ScrollView style={{ width: "100%" }}>
        {rows.map((row) => (
          <Text key={row.id} style={{ fontSize: 18, marginVertical: 4 }}>
            {row.id}. {row.value}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
