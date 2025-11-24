import { Alert, Platform, Linking } from 'react-native';

export const handleBiometricError = (error: any): string => {
  if (!error) return 'Unknown error';
  
  const errorMessage = error.toString().toLowerCase();
  
  if (errorMessage.includes('not enrolled') || errorMessage.includes('no biometric')) {
    return 'NOT_ENROLLED';
  } else if (errorMessage.includes('locked') || errorMessage.includes('lockout')) {
    return 'LOCKED_OUT';
  } else if (errorMessage.includes('cancel') || errorMessage.includes('user cancel')) {
    return 'USER_CANCELLED';
  } else if (errorMessage.includes('not available')) {
    return 'NOT_AVAILABLE';
  }
  
  return 'UNKNOWN_ERROR';
};

export const showBiometricSetupAlert = () => {
  Alert.alert(
    'Biometric Tidak Dikonfigurasi',
    'Anda belum mengatur sidik jari/wajah di perangkat ini. Silakan atur terlebih dahulu di pengaturan perangkat.',
    [
      { text: 'Batal', style: 'cancel' },
      { 
        text: 'Buka Pengaturan', 
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:TOUCHID_PASSCODE');
          } else {
            Linking.openSettings();
          }
        }
      }
    ]
  );
};

export const getBiometricPromptMessage = (type: string, context?: string): string => {
  const baseMessages = {
    FaceID: 'Pindai Wajah',
    TouchID: 'Tempelkan Jari',
    Biometrics: 'Verifikasi Biometrik'
  };

  const baseMessage = baseMessages[type as keyof typeof baseMessages] || 'Verifikasi Identitas';
  
  return context ? `${baseMessage} ${context}` : `${baseMessage} untuk Melanjutkan`;
};