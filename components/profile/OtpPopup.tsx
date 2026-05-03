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

export default function OtpPopup({
  visible,
  email,
  onVerified,
  onClose,
}: any) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (text: string, i: number) => {
    const newOtp = [...otp];
    newOtp[i] = text;
    setOtp(newOtp);
  };

  const verifyOtp = async () => {
    const code = otp.join("");

    try {
      const res = await api.post("/customer/forgot/verify", {
        email,
        otp: code,
      });

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        onVerified();
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          
          {/* TITLE */}
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to your email
          </Text>

          {/* OTP INPUTS */}
          <View style={styles.row}>
            {otp.map((_, i) => (
              <TextInput
                key={i}
                style={styles.otp}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(t) => handleChange(t, i)}
              />
            ))}
          </View>

          {/* VERIFY BUTTON */}
          <TouchableOpacity style={styles.btn} onPress={verifyOtp}>
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>

          {/* CLOSE */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  box: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 14,
    width: "90%",
    alignItems: "center",
    elevation: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2872A1",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  
  otp: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 5,
  },

  btn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginTop: 5,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },

  close: {
    marginTop: 12,
    color: "#4a90e2",
    fontSize: 14,
    fontWeight: "500",
  },
});