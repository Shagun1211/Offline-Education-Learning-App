import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { executeSql } from "../storage/database";
import { AuthContext } from "../context/AuthContext";

export default function ProgressScreen() {
  const [progress, setProgress] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadProgress = async () => {
      const res = await executeSql("SELECT * FROM progress WHERE user_id=?", [user.id]);
      setProgress(res.rows._array);
    };
    loadProgress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Progress</Text>
      <FlatList
        data={progress}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Lesson: {item.lesson_id}</Text>
            <Text>Score: {item.score}%</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:"#042a36ff"},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#076352ff", padding: 10, borderRadius: 8, marginVertical: 5 },
});
