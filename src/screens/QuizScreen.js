// import React, { useEffect, useState, useContext } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { executeSql } from "../storage/database";
// import { AuthContext } from "../context/AuthContext";

// export default function QuizScreen() {
//   const [question, setQuestion] = useState(null);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const loadQuiz = async () => {
//       const res = await executeSql("SELECT * FROM quizzes LIMIT 1");
//       if (res.rows._array.length > 0) setQuestion(res.rows._array[0]);
//     };
//     loadQuiz();
//   }, []);

//   const handleAnswer = async (index) => {
//     if (!question) return;
//     const correct = index === question.correct_index;
//     await executeSql(
//       "INSERT INTO progress (user_id, lesson_id, score, date) VALUES (?, ?, ?, ?)",
//       [user.id, question.lesson_id, correct ? 100 : 0, new Date().toISOString()]
//     );
//     Alert.alert("Result", correct ? "Correct!" : "Wrong answer");
//   };

//   if (!question) return <Text style={{ textAlign: "center", marginTop: 50 }}>No Quiz Available</Text>;
  

//   const options = JSON.parse(question.options);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{question.question}</Text>
//       {options.map((opt, i) => (
//         <TouchableOpacity key={i} style={styles.option} onPress={() => handleAnswer(i)}>
//           <Text style={styles.optionText}>{opt}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   option: { padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginVertical: 10 },
//   optionText: { fontSize: 16 },
// });

import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert} from "react-native";
import { executeSql } from "../storage/database";
import { AuthContext } from "../context/AuthContext";
import React from "react";
import QuizList from "../component/QuizList";


export default function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadQuiz = async () => {
      const res = await executeSql("SELECT * FROM quizzes");
      if (res.rows._array.length > 0) {
        setQuestions(res.rows._array);
      }
    };
    loadQuiz();
  }, []);

  const currentQuestion = questions[currentIndex];
  const options = currentQuestion ? JSON.parse(currentQuestion.options) : [];

  const handleAnswer = async (index) => {
    if (!currentQuestion) return;

    setSelectedOption(index);
    const correct = index === currentQuestion.correct_index;

    // Save progress
    await executeSql(
      "INSERT INTO progress (user_id, lesson_id, score, date) VALUES (?, ?, ?, ?)",
      [user.id, currentQuestion.lesson_id, correct ? 100 : 0, new Date().toISOString()]
    );

    Alert.alert("Result", correct ? "Correct!" : "Wrong answer", [
      { text: "Next", onPress: () => handleNext() },
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("Quiz Completed", "You have finished all questions!");
    }
  };

  if (questions.length === 0) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>No Quiz Available</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
    <QuizList/>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Time</Text>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionButton,
              selectedOption === i && styles.selectedOption,
            ]}
            onPress={() => handleAnswer(i)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === i && styles.selectedOptionText,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedOption !== null && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042a36ff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  progressText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 16,
  },
  questionCard: {
    marginTop: 30,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    marginVertical: 8,
  },
  selectedOption: {
    backgroundColor: "#3498db",
  },
  optionText: {
    fontSize: 18,
    color: "#3498db",
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 25,
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
