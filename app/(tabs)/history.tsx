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

// ✅ IMPORTANT FIX FOR SDK 54
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

// ================= TYPE =================
type Payment = {
  id: number;
  bill_id: number;
  amount: number;
  status: string;
  created_at: string;
  bill?: {
    billing_date?: string;
  };
};

// ================= COMPONENT =================
export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  const fetchPayments = async () => {
    try {
      const res = await api.get("/customer/history");

      const filtered = (res.data.payments || []).filter(
        (p: any) => p.status === "Verified"
      );

      setPayments(filtered);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPayments();
    }, [])
  );

  // ================= DOWNLOAD RECEIPT (FIXED) =================
  const downloadReceipt = async (paymentId: number) => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const url = `${api.defaults.baseURL}/customer/payment/${paymentId}/receipt`;

      const fileUri =
        FileSystem.documentDirectory + `receipt-${paymentId}.pdf`;

      const downloadResult = await FileSystem.downloadAsync(url, fileUri, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      });

      if (downloadResult.status !== 200) {
        console.log("Download failed:", downloadResult.status);
        return;
      }

      await Sharing.shareAsync(downloadResult.uri);
    } catch (err) {
      console.log("Download error:", err);
    }
  };

  // ================= FILTER =================
  const filteredPayments = payments.filter((p) => {
    const text = `
      ${p.bill_id}
      ${p.amount}
      ${p.status}
      ${p.created_at}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // ================= RENDER =================
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
          id: item.id,
          bill_id: item.bill_id,
          month: monthValue,
          amount: item.amount,
          created_at: item.created_at,
          status: item.status,
        }}
        fields={[
          { label: "Bill ID", key: "bill_id" },
          { label: "Month", key: "month" },
          { label: "Amount", key: "amount", type: "money" },
          { label: "Date Paid", key: "created_at", type: "date" },
        ]}
        showPayButton={false}
        onDownload={() => downloadReceipt(item.id)}
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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