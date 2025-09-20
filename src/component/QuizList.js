import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const quizzes = [
  { id: 1, title: "Quiz 1" },
  { id: 2, title: "Quiz 2" },
  { id: 3, title: "Quiz 3" },
  { id: 4, title: "Quiz 4" },
  { id: 5, title: "Quiz 5" },
];

export default function QuizList() {
  const handleStart = (quiz) => {
    alert(`Starting ${quiz.title}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizzes.map((quiz) => (
        <View key={quiz.id} style={styles.card}>
          <Text style={styles.title}>{quiz.title}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleStart(quiz)}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
