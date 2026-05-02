import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  note: any;
  onDelete: () => void;
  onRead: () => void;
};

export default function NotificationCard({
  note,
  onDelete,
  onRead,
}: Props) {
  const getIcon = () => {
    if (note.type === "bill_created") {
      return require("../assets/icons/bill.png");
    }
    if (note.type === "payment_status" && note.message.includes("approved")) {
      return require("../assets/icons/check.png");
    }
    if (note.type === "payment_status" && note.message.includes("rejected")) {
      return require("../assets/icons/cross.png");
    }
    return require("../assets/icons/bell.png");
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !note.read && styles.unread,
      ]}
      onPress={onRead}
    >
      {/* ICON */}
      <Image source={getIcon()} style={styles.icon} />

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.message}>{note.message}</Text>
        <Text style={styles.date}>
          {new Date(note.created_at).toLocaleString()}
        </Text>
      </View>

      {/* DELETE */}
      <TouchableOpacity onPress={onDelete}>
        <Image
          source={require("../assets/icons/delete.png")}
          style={styles.delete}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "flex-start",
  },

  unread: {
    borderLeftWidth: 5,
    borderLeftColor: "#007bff",
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  message: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  date: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },

  delete: {
    width: 20,
    height: 20,
  },
});