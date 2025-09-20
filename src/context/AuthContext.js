import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { executeSql } from "../storage/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => { restoreSession(); }, []);

  const restoreSession = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      const res = await executeSql("SELECT * FROM users WHERE id=?", [id]);
      if (res.rows._array.length > 0) setUser(res.rows._array[0]);
    }
  };

  const signIn = async (email, password) => {
    const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    const res = await executeSql("SELECT * FROM users WHERE email=? AND password=?", [email, hashed]);
    if (res.rows._array.length > 0) {
      const userData = res.rows._array[0];
      setUser(userData);
      await AsyncStorage.setItem("userId", String(userData.id));
      return true;
    }
    return false;
  };

  const signUp = async (name, email, password) => {
    const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    try {
      await executeSql("INSERT INTO users (name, email, password) VALUES (?, ?, ?);", [name, email, hashed]);
      return signIn(email, password);
    } catch (e) {
      console.log("Signup error", e);
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
