import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { useBiometric } from '../hooks/useBiometric';
import { BiometricButton } from '../components/BiometricAuth/BiometricButton';
import { TransferScreenNavigationProp } from '../types/navigation';

interface TransferScreenProps {
  navigation: TransferScreenNavigationProp;
}

export const TransferScreen: React.FC<TransferScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { authenticateWithDynamicMessage, biometricInfo } = useBiometric();

  const processPayment = () => {
    // Simulasi proses pembayaran
    Alert.alert(
      'Transfer Berhasil',
      `Transfer Rp ${amount} ke ${recipient} berhasil diproses.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
    setAmount('');
    setRecipient('');
  };

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      Alert.alert('Error', 'Harap isi jumlah dan penerima');
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      Alert.alert('Error', 'Jumlah transfer tidak valid');
      return;
    }

    setIsProcessing(true);

    try {
      // Konfirmasi dengan biometrik
      const success = await authenticateWithDynamicMessage('Transfer', amount);

      if (success) {
        processPayment();
      } else {
        Alert.alert('Dibatalkan', 'Transfer dibatalkan');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat verifikasi');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransferWithoutBiometric = () => {
    if (!amount || !recipient) {
      Alert.alert('Error', 'Harap isi jumlah dan penerima');
      return;
    }

    Alert.alert(
      'Konfirmasi Transfer',
      `Transfer Rp ${amount} ke ${recipient}?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Transfer', 
          onPress: processPayment,
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Transfer Uang</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nomor Rekening Penerima"
          value={recipient}
          onChangeText={setRecipient}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Jumlah Transfer"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.amountText}>
          {amount ? `Rp ${parseFloat(amount).toLocaleString('id-ID')}` : 'Rp 0'}
        </Text>

        {/* Biometric Confirmation */}
        <BiometricButton
          onPress={handleTransfer}
          title={`Konfirmasi Transfer Rp ${amount || '0'}`}
          disabled={!amount || !recipient || isProcessing}
          context={`Transfer Rp ${amount}`}
        />

        {/* Fallback tanpa biometrik */}
        <TouchableOpacity
          style={[styles.transferButton, (!amount || !recipient) && styles.buttonDisabled]}
          onPress={handleTransferWithoutBiometric}
          disabled={!amount || !recipient || isProcessing}
        >
          <Text style={styles.transferButtonText}>
            {isProcessing ? 'Memproses...' : 'Transfer Tanpa Biometrik'}
          </Text>
        </TouchableOpacity>

        {/* Info biometrik */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {biometricInfo.available 
              ? `Gunakan ${biometricInfo.biometryType} untuk konfirmasi transfer yang lebih aman`
              : 'Transfer akan dikonfirmasi dengan dialog standar'
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#007AFF',
  },
  transferButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
});