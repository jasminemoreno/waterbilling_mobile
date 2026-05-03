import { StyleSheet, Text, View } from 'react-native';

export default function NotificationsCard({ currentBill, lastPayment }: any) {
  return (
    <View style={styles.card}>

      <Text style={styles.header}>Quick Notifications</Text>

      {/* NEW BILL */}
      {currentBill && (
        <View style={[styles.item, styles.yellow]}>
          <Text style={styles.title}>📌 New Bill Available</Text>
          <Text style={styles.text}>
            Due:{" "}
            {currentBill?.due_date
              ? new Date(currentBill.due_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '-'}
          </Text>
        </View>
      )}

      {/* PAYMENT STATUS */}
      {!lastPayment ? (
        <View style={[styles.item, styles.blue]}>
          <Text style={styles.title}>💡 No Payments Yet</Text>
          <Text style={styles.text}>
            You have not made any payments yet.
          </Text>
        </View>
      ) : (
        <View style={[styles.item, styles.blue]}>
          <Text style={styles.title}>💰 Last Payment</Text>
          <Text style={styles.text}>
            {lastPayment?.created_at
              ? new Date(lastPayment.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '-'}
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
    borderRadius: 14,
    elevation: 3,
  },

  header: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2872A1',
  },

  item: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  yellow: {
    backgroundColor: '#FFEDCD',
  },

  blue: {
    backgroundColor: '#B4EEF2',
  },

  title: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },

  text: {
    fontSize: 12,
    color: '#444',
  },
});