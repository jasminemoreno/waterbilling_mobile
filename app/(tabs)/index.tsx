import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import api from '../../config/api';

import DashboardCards from '../../components/DashboardCards';
import NotificationsCard from '../../components/NotificationsCard';
import WaterUsageChart from '../../components/WaterChart';

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
      const token = await AsyncStorage.getItem('customerToken');

      const res = await api.get('/customer/dashboardData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <ScrollView style={styles.page}>
  
      {/* 1. DASHBOARD CARDS (3 cards now) */}
      <DashboardCards
        currentBill={data?.currentBill}
        lastPayment={data?.lastPayment}
        chartData={data?.chartData}
      />

      {/* 2. WATER USAGE CHART */}
      <WaterUsageChart
        chartLabels={data?.chartLabels}
        chartData={data?.chartData}
        chartColors={data?.chartColors}
      />
  
      {/* 3. QUICK NOTIFICATIONS */}
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
    backgroundColor: '#CBDDE9',
    paddingHorizontal: 12,   // 🔥 smaller side padding
    paddingTop: 10,
  },


  gridRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    alignItems: 'flex-start',
  },

  leftColumn: {
    flex: 2, // Vue: 2fr
  },

  rightColumn: {
    flex: 1, // Vue: 1fr
  },
});