import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import BillCard from "../../components/BillCard";
import api from "../../config/api";

// ================= TYPES =================
type Payment = {
  bill_id: number;
  amount: number;
  status: string;
  created_at: string;
  bill?: {
    billing_date?: string;
  };
};

// ================= FIELDS =================
const fields = [
  { label: "Bill ID", key: "bill_id" },
  { label: "Month", key: "month" },
  { label: "Amount", key: "amount", type: "money" as const },
  { label: "Date Paid", key: "created_at", type: "date" as const }, // ✅ FIX HERE
];

// ================= COMPONENT =================
export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const res = await api.get("/customer/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = (res.data.payments || []).filter(
        (p: any) => p.status === "Verified"
      );

      setPayments(filtered);
    } catch (err) {
      console.log("Error fetching payment history:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPayments();

      const interval = setInterval(() => {
        fetchPayments();
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  const filteredPayments = payments.filter((p) => {
    const text = `
      ${p.bill_id}
      ${p.amount}
      ${p.status}
      ${p.created_at}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const renderItem = ({ item }: { item: Payment }) => {
    const monthValue =
      item.bill?.billing_date
        ? new Date(item.bill.billing_date).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })
        : "-";

    return (
      <BillCard
        item={{
          bill_id: item.bill_id,
          month: monthValue,
          amount: item.amount,
          created_at: item.created_at, // ✅ IMPORTANT FIX
          status: item.status,
        }}
        fields={fields}
        showPayButton={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>

      <TextInput
        placeholder="Search history..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredPayments}
        keyExtractor={(item, index) =>
          item.bill_id?.toString() || index.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No payment history found.</Text>
        }
      />
    </View>
  );
}

// ================= STYLES (UNCHANGED) =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDDE9",
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2872A1",
    textAlign: "center",
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
  },
});