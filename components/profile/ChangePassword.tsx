// components/settings/ChangePasswordModal.tsx

import React, { useState } from "react";
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

export default function ChangePasswordModal({
  visible,
  onClose,
  onUpdated,
}: any) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const save = async () => {
    try {
      const res = await api.post(
        "/customer/settings/change-password",
        {
          current_password: current,
          new_password: newPass,
          new_password_confirmation: confirm,
        }
      );

      if (res.data.success) {
        setCurrent("");
        setNewPass("");
        setConfirm("");
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
                <Text style={styles.title}>
                  Change Password
                </Text>

                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.close}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>
                Current Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={current}
                onChangeText={setCurrent}
              />

              <Text style={styles.label}>
                New Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
              />

              <Text style={styles.label}>
                Confirm Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={save}
              >
                <Text style={styles.saveText}>
                  Update Password
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