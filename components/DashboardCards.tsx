import { StyleSheet, Text, View } from 'react-native';

export default function DashboardCards({ currentBill, lastPayment }: any) {
  return (
    <View style={styles.container}>

      {/* CURRENT BILL */}
      <View style={[styles.card, styles.currentBill]}>
        <View style={[styles.topBar, { backgroundColor: '#081566' }]} />

        <Text style={styles.title}>Current Bill</Text>

        <Text style={styles.value}>
          ₱ {currentBill?.total ?? '0.00'}
        </Text>

        <Text style={styles.sub}>
          Due: {currentBill?.due_date
            ? new Date(currentBill.due_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '-'}
        </Text>
      </View>

      {/* LAST PAYMENT */}
      <View style={[styles.card, styles.lastPayment]}>
        <View style={[styles.topBar, { backgroundColor: '#075B93' }]} />

        <Text style={styles.title}>Last Payment</Text>

        <Text style={styles.value}>
          ₱ {lastPayment?.amount ?? '0.00'}
        </Text>

        <Text style={styles.sub}>
          {lastPayment?.created_at
            ? new Date(lastPayment.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'No payment yet'}
        </Text>
      </View>

      {/* WATER USAGE */}
      <View style={[styles.card, styles.waterUsage]}>
        <View style={[styles.topBar, { backgroundColor: '#B2965F' }]} />

        <Text style={styles.title}>Water Usage</Text>

        <Text style={styles.value}>
          {currentBill?.consumption ?? '0'} m³
        </Text>

        <Text style={styles.sub}>This Month</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  topBar: {
    height: 5,
    width: '100%',
    marginBottom: 8,
    borderRadius: 5,
  },

  currentBill: {
    backgroundColor: '#9BBCD4',
  },

  lastPayment: {
    backgroundColor: '#B4EEF2',
  },

  waterUsage: {
    backgroundColor: '#FFEDCD',
  },

  title: {
    fontSize: 14,
    color: '#666',
  },

  value: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 5,
    color: '#2c3e50',
  },
  sub: {
    fontSize: 12,
    marginTop: 5,
    color: '#777',
  },
});