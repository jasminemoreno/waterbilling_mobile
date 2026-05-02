import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/api";

import BillCard from "../../components/BillCard";

type Payment = {
  bill_id: number;
  month: string;
  amount: number;
  date_paid: string;
  status: string;
};

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);

  // FETCH PAYMENT HISTORY
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

  // TRANSFORM DATA FOR CARD
  const renderItem = ({ item }: { item: Payment }) => {
    const billLike = {
      id: item.bill_id,
      month: item.month,
      total: item.amount,
      status: item.status,
      date_paid: item.date_paid,
    };

    return (
      <BillCard
        item={billLike as any}
        showPayButton={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>Payment History</Text>

      {/* LIST */}
      <FlatList
        data={payments}
        keyExtractor={(item, index) =>
          item.bill_id?.toString() || index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No payment history found.</Text>
        }
      />
    </View>
  );
}

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

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
  },
});