import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bill } from "../components/types/Bill";

type Props = {
  item: Bill;
  showPayButton?: boolean;
  onPay?: (item: Bill) => void;
};

// ✅ format date to words
const formatDate = (date?: string) => {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ✅ safe money format
const formatMoney = (value: any) => {
  if (value === null || value === undefined) return "0.00";
  return Number(value).toFixed(2);
};

export default function BillCard({
  item,
  showPayButton = false,
  onPay,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Bill ID: {item?.id ?? "-"}
      </Text>

      <Text style={styles.text}>
        Meter No: {item?.meter_no ?? "-"}
      </Text>

      <Text style={styles.text}>
        Consumption: {item?.consumption ?? 0} m³
      </Text>

      <Text style={styles.text}>
        Total: ₱{formatMoney(item?.total)}
      </Text>

      <Text style={styles.text}>
        Billing Date: {formatDate(item?.billing_date)}
      </Text>

      <Text style={styles.text}>
        Due Date: {formatDate(item?.due_date)}
      </Text>

      <Text
        style={[
          styles.status,
          item?.status === "Pending"
            ? styles.pending
            : item?.status === "Paid"
            ? styles.paid
            : item?.status === "Verified"
            ? styles.verified
            : styles.unpaid,
        ]}
      >
        Status: {item?.status ?? "-"}
      </Text>

      {showPayButton &&
        item?.status !== "Paid" &&
        item?.status !== "Verified" && (
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
    fontSize: 14,
  },

  text: {
    fontSize: 13,
    marginBottom: 3,
    color: "#333",
  },

  status: {
    marginTop: 8,
    marginBottom: 10,
    fontWeight: "600",
  },

  unpaid: {
    color: "#d9534f",
  },

  pending: {
    color: "#f0ad4e",
  },

  paid: {
    color: "#28a745",
  },

  verified: {
    color: "#2872A1",
  },

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