import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../config/api';

export default function PayBillModal({ bill, onClose, onSuccess }) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const submit = async () => {
    if (!file) {
      setError('Please select a screenshot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await AsyncStorage.getItem('customerToken');

      const formData = new FormData();
      formData.append('amount', bill.total);
      formData.append('message', message);
      formData.append('screenshot', {
        uri: file.uri,
        name: 'payment.jpg',
        type: 'image/jpeg',
      });

      await api.post(`/customer/paybills/${bill.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onSuccess(); // trigger success modal
    } catch (err) {
      console.log(err);
      setError('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.title}>Pay Bill</Text>

          <Text style={styles.amount}>
            Amount: ₱{Number(bill.total).toFixed(2)}
          </Text>

          <TextInput
            placeholder="Message (optional)"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />

          <TouchableOpacity style={styles.upload} onPress={pickImage}>
            <Text>Select Screenshot</Text>
          </TouchableOpacity>

          {file && (
            <Text style={styles.file}>
              Selected: {file.fileName || 'image.jpg'}
            </Text>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={submit}
            disabled={loading}
          >
            <Text style={{ color: '#fff' }}>
              {loading ? 'Sending...' : 'Send Payment'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Close</Text>
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

  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2872A1',
  },

  amount: {
    marginBottom: 10,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  upload: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#2872A1',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  file: {
    fontSize: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2872A1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  close: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },
});