import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../config/api';

/* ================= TYPES ================= */
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
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const token = await AsyncStorage.getItem('customerToken');

      const res = await api.get('/bills', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBills(res.data as Bill[]);
    } catch (err) {
      console.log('Error loading bills:', err);
    }
  };

  /* ================= SAFE FILTER ================= */
  const filtered = bills.filter((b) => {
    const text =
      `${b.id} ${b.status} ${b.customer?.customer_name ?? ''}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

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
        keyExtractor={(item: Bill) => item.id.toString()}
        renderItem={({ item }: { item: Bill }) => (
          <View style={styles.card}>

            <Text style={styles.title}>Bill #{item.id}</Text>

            <Text style={styles.text}>
              Customer: {item.customer?.customer_name ?? 'N/A'}
            </Text>

            <Text style={styles.text}>
              Meter No: {item.customer?.meter_no ?? 'N/A'}
            </Text>

            <Text style={styles.text}>
              Consumption: {item.consumption} m³
            </Text>

            <Text style={styles.text}>
              Total: ₱{Number(item.total ?? 0).toFixed(2)}
            </Text>

            <Text style={styles.text}>
              Billing Date: {item.billing_date?.split('T')?.[0] ?? 'N/A'}
            </Text>

            <Text style={styles.text}>
              Due Date: {item.due_date?.split('T')?.[0] ?? 'N/A'}
            </Text>

            <Text style={styles.status}>
              Status: {item.status}
            </Text>

            {/* PAY BUTTON */}
            <TouchableOpacity
              style={styles.payBtn}
              onPress={() => {
                setSelectedBill(item);
                setShowModal(true);
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Pay Bill
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

      

    </View>
  );
}

/* ================= STYLES ================= */
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

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2872A1',
    marginBottom: 6,
  },

  text: {
    fontSize: 13,
    marginBottom: 2,
    color: '#333',
  },

  status: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#555',
  },

  payBtn: {
    marginTop: 10,
    backgroundColor: '#2872A1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});