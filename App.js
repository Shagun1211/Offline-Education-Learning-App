
// import TestSQLite from "./src/TestSQLite";

// export default TestSQLite;
import 'react-native-gesture-handler';
import 'react-native-reanimated';


import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDB } from "./src/storage/database";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      setLoading(false);
    };
    setup();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider>
  );
}
