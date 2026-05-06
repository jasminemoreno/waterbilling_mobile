import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BillCard from "../../components/BillCard";
import PaymentModal from "../../components/PaymentModal";
import SuccessPopup from "../../components/SuccessPopup";
import api from "../../config/api";

import dayjs from "dayjs";

// ================= TYPES =================
type Bill = {
  id: number;
  total: number;
  status: string;
  billing_date?: string;
};

// ================= FIELDS (FIXED TYPE SAFE) =================
const fields = [
  { label: "Bill ID", key: "id" },
  { label: "Month", key: "month" },
  { label: "Amount", key: "total", type: "money" as const },
];

// ================= COMPONENT =================
export default function PayBill() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");

  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ================= FETCH =================
  const fetchBills = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const res = await api.get("/customer/paybills", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = (res.data || []).filter(
        (b: any) => b.status === "Unpaid" || b.status === "Pending"
      );

      setBills(filtered);
    } catch (err) {
      console.log("Error loading bills", err);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    fetchBills();
  }, []);

  // ================= AUTO REFRESH =================
  useFocusEffect(
    useCallback(() => {
      fetchBills();

      const interval = setInterval(() => {
        fetchBills();
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= SEARCH =================
  const filteredBills = bills.filter((b: any) => {
    const text = `
      ${b.id}
      ${b.total}
      ${b.status}
      ${b.billing_date ?? ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // ================= ACTIONS =================
  const openModal = (bill: any) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  const onSuccess = () => {
    setShowModal(false);
    setShowSuccess(true);
    fetchBills();
  };

  // ================= RENDER ITEM =================
  const renderItem = ({ item }: { item: any }) => {
    const mappedItem = {
      id: item.id,
      month: item.billing_date
        ? dayjs(item.billing_date).format("MMMM YYYY")
        : "-",
      total: Number(item.total ?? 0),
      status: item.status,
      billing_date: item.billing_date,
    };

    return (
      <BillCard
        item={mappedItem}
        fields={fields}
        showPayButton={true}
        onPay={openModal}
      />
    );
  };

  // ================= UI (UNCHANGED) =================
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pay Bills</Text>

      <TextInput
        placeholder="Search bills..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No bills available.</Text>
        }
      />

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Payment Details</Text>

        <Text>
          <Text style={styles.bold}>GCash:</Text> 09XXXXXXXXX
        </Text>
        <Text>
          <Text style={styles.bold}>Name:</Text> Telma
        </Text>
        <Text>Upload screenshot during payment.</Text>
      </View>

      <PaymentModal
        show={showModal}
        bill={selectedBill}
        onClose={() => setShowModal(false)}
        onSubmitted={onSuccess}
      />

      <SuccessPopup
        show={showSuccess}
        message="Payment submitted successfully!"
        onClose={() => setShowSuccess(false)}
      />
    </ScrollView>
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

  detailsCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
  },

  detailsTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: "#0f4c75",
  },

  bold: {
    fontWeight: "700",
  },
});