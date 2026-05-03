import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2872A1" />
        <Text style={{ marginTop: 10 }}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={true} // 🔥 important for smooth feel
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#CBDDE9",
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 10,

    // 🔥 IMPORTANT FOR TAB BAR + SCROLL SMOOTHNESS
    paddingBottom: 140,

    gap: 15,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});