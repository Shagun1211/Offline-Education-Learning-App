import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { executeSql } from "../storage/database";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video"; // ✅ Important!

export default function LessonsListScreen() {
  const [lessons, setLessons] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadLessons = async () => {
      const res = await executeSql("SELECT * FROM lessons");
      setLessons(res.rows._array);
    };
    loadLessons();
  }, []);

  return (
    <View style={styles.container}>
    

      <FlatList
        data={lessons}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content.slice(0, 50)}...</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#042a36ff" },
  card: { backgroundColor: "#042a36ff", padding: 15, borderRadius: 8, marginVertical: 8 },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  content: { marginTop: 5, color: "#ccc" },
  
});
