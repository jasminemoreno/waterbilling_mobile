import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ConfirmModal({
  show,
  message,
  onConfirm,
  onCancel,
}: any) {
  return (
    <Modal transparent visible={show} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.text}>{message}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={onCancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={onConfirm}
            >
              <Text style={{ color: "#fff" }}>Delete</Text>
            </TouchableOpacity>
          </View>
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

  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 280,
  },

  text: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancel: {
    padding: 10,
  },

  delete: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
  },
});