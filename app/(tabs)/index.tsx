import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import api from "../../config/api";

import DashboardCards from "../../components/DashboardCards";
import NotificationsCard from "../../components/NotificationsCard";
import WaterUsageChart from "../../components/WaterChart";

type DashboardData = {
  currentBill: any;
  lastPayment: any;
  chartLabels: string[];
  chartData: number[];
  chartColors?: string[];
};

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const res = await api.get("/customer/dashboardData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    fetchDashboard();
  }, []);

  // ================= POLLING =================
  useFocusEffect(
    useCallback(() => {
      fetchDashboard(); // refresh when page opens

      const interval = setInterval(() => {
        fetchDashboard(); // auto refresh every 10 sec
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2872A1" />
        <Text style={{ marginTop: 10 }}>Loading dashboard...</Text>
      </View>
    );
  }

  // ================= UI =================
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={[styles.content, { flexGrow: 1 }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={true}
    >
      <DashboardCards
        currentBill={data?.currentBill}
        lastPayment={data?.lastPayment}
        chartData={data?.chartData}
      />

      <WaterUsageChart
        chartLabels={data?.chartLabels}
        chartData={data?.chartData}
        chartColors={data?.chartColors}
      />

      <NotificationsCard
        currentBill={data?.currentBill}
        lastPayment={data?.lastPayment}
      />
    </ScrollView>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#CBDDE9",
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 140,
    gap: 15,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});