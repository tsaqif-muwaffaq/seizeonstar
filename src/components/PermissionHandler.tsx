import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PermissionService from '../utils/permissions';

interface PermissionHandlerProps {
  permissionType: 'camera' | 'storage' | 'both';
  onPermissionGranted: () => void;
  onPermissionDenied?: () => void;
  children: React.ReactNode;
}

const PermissionHandler: React.FC<PermissionHandlerProps> = ({
  permissionType,
  onPermissionGranted,
  onPermissionDenied,
  children,
}) => {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      let cameraPermission = true;
      let storagePermission = true;

      if (permissionType === 'camera' || permissionType === 'both') {
        cameraPermission = await PermissionService.checkCameraPermission();
      }

      if (permissionType === 'storage' || permissionType === 'both') {
        storagePermission = await PermissionService.checkStoragePermission();
      }

      setHasPermission(cameraPermission && storagePermission);
    } catch (error) {
      console.error('Error checking permissions:', error);
      setHasPermission(false);
    }
  };

  const requestPermissions = async () => {
    try {
      let cameraGranted = true;
      let storageGranted = true;

      if (permissionType === 'camera' || permissionType === 'both') {
        cameraGranted = await PermissionService.requestCameraPermission();
      }

      if (permissionType === 'storage' || permissionType === 'both') {
        storageGranted = await PermissionService.requestStoragePermission();
      }

      if (cameraGranted && storageGranted) {
        setHasPermission(true);
        onPermissionGranted();
      } else {
        setHasPermission(false);
        onPermissionDenied?.();
        PermissionService.showPermissionDeniedAlert(
          'Aplikasi membutuhkan izin untuk mengakses fitur kamera dan galeri'
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setHasPermission(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Memeriksa izin...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Izin Diperlukan</Text>
        <Text style={styles.message}>
          Aplikasi membutuhkan akses {permissionType === 'both' ? 'kamera dan galeri' : permissionType} untuk melanjutkan
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PermissionHandler;