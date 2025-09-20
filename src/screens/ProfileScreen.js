import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.t1}>Name: {user?.name}</Text>
      <Text style={styles.t1}>Email: {user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20,  backgroundColor:"#042a36ff"},
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 40,  color:"#e0cacaff"},
  button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, marginTop: 20 },
  btnText: { color: "#fff", textAlign: "center", fontSize: 18 },
  t1:{fontSize:20 ,color:"#e0cacaff"},
});
