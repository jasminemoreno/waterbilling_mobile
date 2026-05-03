// components/settings/EditAccountModal.tsx

import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import api from "../../config/api";

export default function EditAccountModal({
  visible,
  customer,
  onClose,
  onUpdated,
}: any) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (customer) {
      setPhone(customer.phone || "");
      setEmail(customer.email || "");
    }
  }, [customer, visible]);

  const save = async () => {
    try {
      const res = await api.post(
        "/customer/settings/update-account",
        {
          phone,
          email,
        }
      );

      if (res.data.success) {
        onUpdated();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>

              <View style={styles.header}>
                <Text style={styles.title}>Edit Account</Text>

                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.close}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={save}
              >
                <Text style={styles.saveText}>
                  Save Changes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  close: {
    fontSize: 20,
    color: "#888",
  },

  label: {
    fontWeight: "700",
    color: "#555",
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  saveBtn: {
    backgroundColor: "#2872A1",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 18,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },

  cancelBtn: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cancelText: {
    fontWeight: "700",
    color: "#333",
  },
});