import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LessonDetailScreen({ route }) {
  const { lesson } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:"#042a36ff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  content: { fontSize: 16, color: "#333" },
});
