import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    if (!show) {
      setMessage("");
      setImage(null);
    }
  }, [show]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const submit = async () => {
    if (!bill || !image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("amount", bill.total);
    formData.append("message", message);
    formData.append("screenshot", {
      uri: image.uri,
      name: "payment.jpg",
      type: "image/jpeg",
    } as any);

    try {
      await api.post(`/customer/paybills/${bill.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSubmitted();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={show} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Pay Bill</Text>

          <Text>Amount: ₱{bill?.total}</Text>

          <TextInput
            placeholder="Message (optional)"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />

          <TouchableOpacity style={styles.upload} onPress={pickImage}>
            <Text style={{ color: "#fff" }}>Upload Screenshot</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          )}

          <TouchableOpacity
            style={styles.submit}
            onPress={submit}
            disabled={loading}
          >
            <Text style={{ color: "#fff" }}>
              {loading ? "Submitting..." : "Send Payment"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={{ marginTop: 10 }}>Close</Text>
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