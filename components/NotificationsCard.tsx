import { StyleSheet, Text, View } from 'react-native';

export default function NotificationsCard({ currentBill, lastPayment }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Quick Notifications</Text>

      {currentBill && (
        <View style={[styles.item, styles.yellow]}>
          <Text style={styles.title}>New Bill Available</Text>
          <Text style={styles.text}>
            Due: {currentBill?.due_date ?? '-'}
          </Text>
        </View>
      )}

      {!lastPayment ? (
        <View style={[styles.item, styles.blue]}>
          <Text style={styles.title}>No Payments Yet</Text>
          <Text style={styles.text}>You have not made any payments.</Text>
        </View>
      ) : (
        <View style={[styles.item, styles.blue]}>
          <Text style={styles.title}>Last Payment</Text>
          <Text style={styles.text}>
            {lastPayment?.created_at}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    elevation: 3,
  },

  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  yellow: {
    backgroundColor: '#FFEDCD',
  },

  blue: {
    backgroundColor: '#B4EEF2',
  },

  title: {
    fontWeight: '600',
  },

  text: {
    fontSize: 12,
    marginTop: 3,
  },
});