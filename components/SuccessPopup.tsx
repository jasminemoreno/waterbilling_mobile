import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuccessPopup({ show, message, onClose }: any) {
  return (
    <Modal visible={show} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Success</Text>

          <Text style={styles.msg}>{message}</Text>

          <TouchableOpacity style={styles.btn} onPress={onClose}>
            <Text style={{ color: "#fff" }}>OK</Text>
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

  box: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  msg: {
    textAlign: "center",
    marginBottom: 15,
  },

  btn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});