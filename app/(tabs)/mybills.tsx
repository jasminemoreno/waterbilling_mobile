import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import BillCard from '../../components/BillCard';
import api from '../../config/api';

type Customer = {
  customer_name?: string;
  meter_no?: string;
};

type Bill = {
  id: number;
  status: string;
  consumption: number;
  total: number | string;
  billing_date?: string | null;
  due_date?: string | null;
  customer?: Customer;
};

export default function MyBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState('');

  // ================= FETCH BILLS =================
  const loadBills = async () => {
    try {
      const token = await AsyncStorage.getItem('customerToken');

      const res = await api.get('/bills', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBills(res.data || []);
    } catch (err) {
      console.log('Error loading bills:', err);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    loadBills();
  }, []);

  // ================= FOCUS + POLLING =================
  useFocusEffect(
    useCallback(() => {
      loadBills(); // refresh immediately when screen opens

      const interval = setInterval(() => {
        loadBills(); // auto refresh every 10s
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= SEARCH FILTER =================
  const filtered = bills.filter((b) => {
    const text =
      `${b.id} ${b.status} ${b.customer?.customer_name ?? ''}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // ================= UI =================
  return (
    <View style={styles.container}>

      {/* SEARCH */}
      <TextInput
        placeholder="Search bills..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BillCard
            item={{
              id: item.id,
              meter_no: item.customer?.meter_no ?? '',
              consumption: item.consumption ?? 0,
              total: Number(item.total ?? 0),

              billing_date: item.billing_date ?? undefined,
              due_date: item.due_date ?? undefined,

              status: item.status,
            }}
          />
        )}
      />
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 15,
  },

  search: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});