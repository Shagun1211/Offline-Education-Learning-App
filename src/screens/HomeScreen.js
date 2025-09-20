// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Language Learning App</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Lessons")}>
//         <Text style={styles.btnText}>Start Lessons</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Quiz")}>
//         <Text style={styles.btnText}>Take Quiz</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Progress")}>
//         <Text style={styles.btnText}>My Progress</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
//         <Text style={styles.btnText}>Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   button: { padding: 15, borderRadius: 10, marginVertical: 10, width: 250, alignItems: "center", backgroundColor: "#3498db" },
//   btnText: { color: "#fff", fontSize: 18 },
// });
import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HoverButton({ title, onPress }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      style={[
        styles.button,
        isHovered && styles.buttonHover
      ]}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d3d3d3" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Language Learning App</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <HoverButton title="Start Lessons" onPress={() => navigation.navigate("Lessons")} />
        <HoverButton title="Take Quiz" onPress={() => navigation.navigate("Quiz")} />
        <HoverButton title="My Progress" onPress={() => navigation.navigate("Progress")} />
        <HoverButton title="Profile" onPress={() => navigation.navigate("Profile")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#042a36ff", 
    alignItems: "center"
  },
  header: {
    width: "100%",
    paddingVertical: 30,
    backgroundColor: "#CECFC7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  buttonsContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 12,
    width: 280,
    alignItems: "center",
    backgroundColor: "#A4A5AE",
    elevation: 5,
    shadowColor: "#600047",
    shadowOffset: { width: 10, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonHover: {
    backgroundColor: "#6e6f7a",
    transform: [{ scale: 1.04 }],
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});