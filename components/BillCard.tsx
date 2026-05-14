import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ================= TYPES =================
type Field = {
  label: string;
  key: string;
  type?: "money" | "date" | "text";
};

type Props = {
  item: any;
  fields: Field[];
  showPayButton?: boolean;
  onPay?: (item: any) => void;
  onDownload?: (item: any) => void;
};

// ================= FORMATTERS =================
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

const formatMoney = (value: any) => {
  if (value === null || value === undefined) return "0.00";
  return Number(value).toFixed(2);
};

// ================= COMPONENT =================
export default function BillCard({
  item,
  fields,
  showPayButton = false,
  onPay,
  onDownload,
}: Props) {
  return (
    <View style={styles.card}>
      
      {/* ================= FIELDS ================= */}
      {fields.map((field) => {
        let value = item?.[field.key];

        if (field.type === "money") {
          value = `₱${formatMoney(value)}`;
        }

        if (field.type === "date") {
          value = formatDate(value);
        }

        return (
          <Text key={field.key} style={styles.text}>
            {field.label}: {value ?? "-"}
          </Text>
        );
      })}

      {/* ================= STATUS ================= */}
      {item?.status && (
        <Text
          style={[
            styles.status,
            item.status === "Pending"
              ? styles.pending
              : item.status === "Paid"
              ? styles.paid
              : item.status === "Verified"
              ? styles.verified
              : styles.unpaid,
          ]}
        >
          Status: {item.status}
        </Text>
      )}

      {/* ================= PAY BUTTON ================= */}
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

      {/* ================= DOWNLOAD BUTTON ================= */}
      {onDownload && (
        <TouchableOpacity
          style={[styles.payBtn, styles.downloadBtn]}
          onPress={() => onDownload(item)}
        >
          <Text style={styles.payBtnText}>Download Receipt</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ================= STYLES (UNCHANGED) =================
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  text: {
    fontSize: 13,
    marginBottom: 4,
    color: "#333",
  },

  status: {
    marginTop: 8,
    marginBottom: 10,
    fontWeight: "600",
  },

  unpaid: { color: "#d9534f" },
  pending: { color: "#f0ad4e" },
  paid: { color: "#28a745" },
  verified: { color: "#2872A1" },

  payBtn: {
    backgroundColor: "#2872A1",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  payBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  downloadBtn: {
    backgroundColor: "#28a745",
    marginTop: 10,
  },
});