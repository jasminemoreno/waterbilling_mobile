import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default function SuccessModal({ visible, message, onClose }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>

        <View style={styles.box}>

          <View style={styles.icon}>
            <Text style={{ fontSize: 30 }}>✔</Text>
          </View>

          <Text style={styles.title}>Success!</Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={{ color: '#fff' }}>OK</Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    box: {
      width: 280,
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 25,
      alignItems: 'center',
    },
  
    icon: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#e6f7ea',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
  
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#222',
    },
  
    message: {
      textAlign: 'center',
      color: '#555',
      marginBottom: 15,
    },
  
    button: {
      backgroundColor: '#2872A1',
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 10,
    },
  });