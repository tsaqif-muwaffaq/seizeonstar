import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert
} from 'react-native';
import { useImagePicker } from '../hooks/useImagePicker';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onImageSelected
}) => {
  const { takePhoto, pickImage, isLoading } = useImagePicker();

  const handleTakePhoto = async () => {
    const result = await takePhoto({
      mediaType: 'photo' as any,
      includeBase64: true,
      quality: 0.8 as any,
    });

    if (result && result.uri) {
      onImageSelected(result.uri);
      onClose();
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage({
      mediaType: 'photo' as any,
      includeBase64: true,
      quality: 0.8 as any,
    });

    if (result && result.uri) {
      onImageSelected(result.uri);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Pilih Sumber Gambar</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleTakePhoto}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Ambil Foto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.galleryButton]}
            onPress={handlePickImage}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Pilih dari Galeri'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1C1C1E',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  galleryButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});