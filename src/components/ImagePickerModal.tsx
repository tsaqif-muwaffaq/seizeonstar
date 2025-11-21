import * as React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import  useImagePicker  from '../hooks/useImagePicker';
import { ImageAsset } from '../types';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImagesSelected: (assets: ImageAsset[]) => void;
  selectionLimit?: number;
  includeBase64?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onImagesSelected,
  selectionLimit = 5,
  includeBase64 = false,
  maxWidth = 600,
  maxHeight = 600,
}) => {
  const { openCamera, openImageLibrary, selectedImages } = useImagePicker();

  const handleCameraPress = async () => {
    try {
      await openCamera({
        mediaType: 'photo',
        quality: 0.7,
        maxWidth,
        maxHeight,
        includeBase64,
        saveToPhotos: true,
      });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Gagal membuka kamera');
    }
  };

  const handleGalleryPress = async () => {
    try {
      await openImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        maxWidth,
        maxHeight,
        includeBase64,
        selectionLimit,
      });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Gagal membuka galeri');
    }
  };

  React.useEffect(() => {
    if (selectedImages.length > 0) {
      onImagesSelected(selectedImages);
    }
  }, [selectedImages, onImagesSelected]);

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
          
          <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
            <Text style={styles.buttonText}>Kamera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handleGalleryPress}>
            <Text style={styles.buttonText}>Galeri</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
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
    backgroundColor: 'white',
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
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F2F2F7',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImagePickerModal;