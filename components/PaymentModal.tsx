import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../config/api";

export default function PaymentModal({
  show,
  bill,
  onClose,
  onSubmitted,
}: any) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ================= PERMISSION =================
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow photo access to upload payment proof."
        );
      }
    })();
  }, []);

  // ================= RESET WHEN CLOSED =================
  useEffect(() => {
    if (!show) {
      setMessage("");
      setImage(null);
    }
  }, [show]);

  // ================= PICK IMAGE =================
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      const asset = result.assets[0];
  
      setImage({
        uri: asset.uri,
        name: asset.fileName ?? "photo.jpg",
        type: "image/jpeg",
      });
    }
  };

  // ================= SUBMIT PAYMENT =================
  const submit = async () => {
    if (!bill || !image) {
      Alert.alert("Missing", "Please select image and bill first.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("customerToken");

      const formData = new FormData();

      formData.append("amount", String(bill.total));
      formData.append("message", message);
      
      // ❌ WRONG (sometimes breaks in React Native)
      // formData.append("screenshot", {...})
      
      const photo = {
        uri: image.uri,
        name: image.name || "photo.jpg",
        type: image.type || "image/jpeg",
      };
      
      formData.append("screenshot", photo as any);
      const res = await api.post(`/customer/paybills/${bill.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("PAYMENT SUCCESS:", res.data);

      Alert.alert("Success", "Payment submitted successfully!");

      onSubmitted();
    } catch (err: any) {
      console.log("PAYMENT ERROR:", err.response?.data || err);

      Alert.alert(
        "Payment Failed",
        JSON.stringify(err.response?.data || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={show} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Pay Bill</Text>

          <Text style={styles.amount}>Amount: ₱{bill?.total}</Text>

          <TextInput
            placeholder="Message (optional)"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />

          {/* PICK IMAGE */}
          <TouchableOpacity style={styles.upload} onPress={pickImage}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Upload Screenshot
            </Text>
          </TouchableOpacity>

          {/* PREVIEW */}
          {image && (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          )}

          {/* SUBMIT */}
          <TouchableOpacity
            style={styles.submit}
            onPress={submit}
            disabled={loading}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              {loading ? "Submitting..." : "Send Payment"}
            </Text>
          </TouchableOpacity>

          {/* CLOSE */}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ marginTop: 12, textAlign: "center" }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  amount: {
    marginBottom: 10,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },

  upload: {
    backgroundColor: "#2872A1",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },

  submit: {
    backgroundColor: "#0f4c75",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});