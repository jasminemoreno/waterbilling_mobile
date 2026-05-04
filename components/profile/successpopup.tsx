import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function SuccessPopup({ message, visible }: any) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.text}>✔ {message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 12,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
  },
});