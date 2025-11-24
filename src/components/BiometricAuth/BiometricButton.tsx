import * as React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useBiometric } from '../../hooks/useBiometric';

interface BiometricButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
  context?: string;
}

export const BiometricButton: React.FC<BiometricButtonProps> = ({
  onPress,
  title,
  disabled = false,
  context
}) => {
  const { biometricInfo, isLoading, isAvailable } = useBiometric();

  if (!isAvailable || isLoading) {
    return null;
  }

  const getButtonText = () => {
    if (title) return title;
    
    if (biometricInfo.biometryType === 'FaceID') {
      return context ? `Gunakan Face ID ${context}` : 'Gunakan Face ID';
    } else {
      return context ? `Gunakan Sidik Jari ${context}` : 'Gunakan Sidik Jari';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>
          {getButtonText()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});