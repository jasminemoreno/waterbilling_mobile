import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import BillCard from "../../components/BillCard";
import api from "../../config/api";

// ================= TYPE (USE IMPORTED ONE ONLY) =================
// ❗ IMPORTANT: REMOVE any local Bill type in this file

import { Bill } from "../../components/types/Bill";

// ================= COMPONENT =================
export default function MyBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  const loadBills = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const res = await api.get("/customer/mybills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBills(res.data || []);
    } catch (err) {
      console.log("Error loading bills:", err);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    loadBills();
  }, []);

  // ================= AUTO REFRESH =================
  useFocusEffect(
    useCallback(() => {
      loadBills();

      const interval = setInterval(() => {
        loadBills();
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= SEARCH =================
  const filtered = bills.filter((b) => {
    const text =
      `${b.id} ${b.status} ${b.meter_no ?? ""}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // ================= RENDER ITEM =================
  const renderItem = ({ item }: { item: Bill }) => {
    return (
      <BillCard
        item={{
          id: item.id,
          meter_no: item.meter_no ?? "-", // ✅ FIXED
          consumption: item.consumption ?? 0,
          total: item.total ?? 0,
          billing_date: item.billing_date ?? undefined,
          due_date: item.due_date ?? undefined,
          status: item.status,
        }}
        fields={[
          { label: "Bill ID", key: "id" },
          { label: "Meter No", key: "meter_no" },
          { label: "Consumption", key: "consumption" },
          { label: "Total", key: "total", type: "money" },
          { label: "Billing Date", key: "billing_date", type: "date" },
          { label: "Due Date", key: "due_date", type: "date" },
        ]}
      />
    );
  };

  // ================= UI (UNCHANGED STYLE) =================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bills</Text>

      <TextInput
        placeholder="Search bills..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
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
});