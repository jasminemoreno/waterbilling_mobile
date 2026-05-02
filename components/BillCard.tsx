import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bill } from "../components/types/Bill";

type Props = {
  item: Bill;
  showPayButton?: boolean;
  onPay?: (item: Bill) => void;
};

export default function BillCard({
  item,
  showPayButton = false,
  onPay,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bill ID: {item.id}</Text>

      {item.month && (
        <Text style={styles.text}>Month: {item.month}</Text>
      )}

      <Text style={styles.text}>
        Amount: ₱{Number(item.total).toFixed(2)}
      </Text>

      <Text
        style={[
          styles.status,
          item.status === "Pending"
            ? styles.pending
            : item.status === "Paid"
            ? styles.paid
            : styles.unpaid,
        ]}
      >
        Status: {item.status}
      </Text>

      {showPayButton && item.status !== "Paid" && (
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => onPay?.(item)}
        >
          <Text style={styles.payBtnText}>Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  title: {
    fontWeight: "700",
    marginBottom: 5,
  },

  text: {
    fontSize: 13,
  },

  status: {
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "600",
  },

  unpaid: { color: "#d9534f" },
  pending: { color: "#f0ad4e" },
  paid: { color: "#28a745" },

  payBtn: {
    backgroundColor: "#2872A1",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  payBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});