import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import api from "../config/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await api.post("/customer/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      await AsyncStorage.setItem("customerToken", res.data.token);

      router.replace("/(tabs)");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("LOGIN ERROR:", error.response?.data || error.message);

        if (error.response?.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("Server error. Try again later.");
        }
      } else {
        console.log("Unknown error:", error);
        setErrorMessage("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/img/water2.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* LOGO */}
        <Image
          source={require("../assets/img/alipao.png")}
          style={styles.logo}
        />

        {/* TITLE */}
        <Text style={styles.title}>
          Barangay Alipao Water Billing System
        </Text>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Login</Text>

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          {/* EMAIL */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="#888"
          />

          {/* PASSWORD */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity
            style={styles.helper}
            onPress={() => router.push("/forgot-password")}
          >
            <Text style={styles.helperText}>Forgot password?</Text>
          </TouchableOpacity>
          {/* BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={login}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Log In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: 420,
    padding: 20,
    alignItems: "center",
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#fff",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(203, 221, 233, 0.75)",
    padding: 22,
    borderRadius: 16,
    elevation: 6,
  },

  cardTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#2872A1",
    marginBottom: 15,
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d0d7de",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 12,
  },

  eyeBtn: {
    paddingHorizontal: 12,
  },

  helper: {
    alignItems: "flex-end",
    marginBottom: 15,
  },

  helperText: {
    color: "#2872A1",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#2872A1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  error: {
    backgroundColor: "#fdeaea",
    color: "#c0392b",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    marginBottom: 10,
  },
});