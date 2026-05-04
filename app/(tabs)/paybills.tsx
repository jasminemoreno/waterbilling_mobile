import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import api from "../../config/api";

import BillCard from "../../components/BillCard";
import PaymentModal from "../../components/PaymentModal";
import SuccessPopup from "../../components/SuccessPopup";

import dayjs from "dayjs";
import { Bill } from "../../components/types/Bill";

export default function PayBill() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

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

  // ================= POLLING =================
  useFocusEffect(
    useCallback(() => {
      fetchBills(); // refresh immediately when page opens

      const interval = setInterval(() => {
        fetchBills(); // auto refresh every 10 sec
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= MODAL =================
  const openModal = (bill: Bill) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSuccess = () => {
    setShowModal(false);
    setShowSuccess(true);
    fetchBills();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pay Bills</Text>

      <FlatList
        data={bills}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <BillCard
            item={{
              id: item.id,
              month: dayjs(item.billing_date).format("MMMM YYYY"),
              total: Number(item.total),
              status: item.status,
              billing_date: item.billing_date,
            }}
            showPayButton={true}
            onPay={openModal}
          />
        )}
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
        onClose={closeModal}
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