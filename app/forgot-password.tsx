import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../config/api";

import OtpPopup from "../components/profile/OtpPopup";
import ResetPasswordPopup from "../components/profile/ResetPasswordPopup";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const sendOtp = async () => {
    if (!email) return Alert.alert("Error", "Enter your email");
  
    try {
      const res = await api.post("/customer/forgot/send", { email });
  
      if (res.data.success) {
        Alert.alert(
          "Success",
          res.data.message,
          [
            {
              text: "OK",
              onPress: () => {
                setShowOtp(true);
              },
            },
          ]
        );
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Server error");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Enter your registered email to receive OTP
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back to Login</Text>
        </TouchableOpacity>
      </View>

      {/* OTP MODAL */}
      <OtpPopup
        visible={showOtp}
        email={email}
        onVerified={() => {
          setShowOtp(false);
          setShowReset(true);
        }}
        onClose={() => setShowOtp(false)}
      />

      {/* RESET MODAL */}
      <ResetPasswordPopup
        visible={showReset}
        email={email}
        onSuccess={() => {
          setShowReset(false);
          Alert.alert("Success", "Password reset successfully!");
          router.replace("/login");
        }}
        onClose={() => setShowReset(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBDDE9",
  },

  container: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  back: {
    marginTop: 15,
    textAlign: "center",
    color: "#4a90e2",
  },
});