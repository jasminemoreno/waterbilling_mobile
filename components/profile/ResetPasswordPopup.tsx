import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../config/api";

export default function ResetPasswordPopup({
  visible,
  email,
  onSuccess,
  onClose,
}: any) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const resetPassword = async () => {
    if (password !== confirm)
      return Alert.alert("Error", "Passwords do not match");

    try {
      const res = await api.post("/customer/forgot/reset", {
        email,
        password,
        password_confirmation: confirm,
      });

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        onSuccess();
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Reset Password</Text>

          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity style={styles.btn} onPress={resetPassword}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },

  btn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  close: {
    textAlign: "center",
    marginTop: 10,
    color: "#4a90e2",
  },
});