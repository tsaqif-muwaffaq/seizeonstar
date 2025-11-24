import { biometricService } from './biometricService';
import { storageService } from './storageService';

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

class AuthService {
  private currentUser: User | null = null;

  async loginManual(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulasi API call untuk login
    try {
      if (username === 'user' && password === '1234') {
        const user: User = {
          id: '1',
          username: 'user',
          email: 'user@example.com',
          token: 'fake-jwt-token-' + Date.now()
        };

        this.currentUser = user;
        
        // Simpan credentials untuk biometric login
        await storageService.saveCredentials(user.username, user.token);
        
        return { success: true, user };
      } else {
        return { success: false, error: 'Username atau password salah' };
      }
    } catch (error) {
      return { success: false, error: 'Terjadi kesalahan saat login' };
    }
  }

  async loginWithBiometric(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Cek ketersediaan biometric
      const biometricInfo = await biometricService.checkAvailability();
      
      if (!biometricInfo.available) {
        return { 
          success: false, 
          error: 'Biometric tidak tersedia di perangkat ini' 
        };
      }

      // Authenticate dengan biometric
      const authResult = await biometricService.authenticate({
        promptMessage: 'Login ke Aplikasi',
        cancelButtonText: 'Gunakan Password'
      });

      if (!authResult.success) {
        return { success: false, error: 'Autentikasi biometric gagal' };
      }

      // Ambil credentials dari storage
      const credentials = await storageService.getCredentials();
      
      if (!credentials) {
        return { success: false, error: 'Tidak ada data login tersimpan' };
      }

      // Simulasikan mendapatkan user data dari token
      const user: User = {
        id: '1',
        username: credentials.username,
        email: 'user@example.com',
        token: credentials.password // token disimpan sebagai password di keychain
      };

      this.currentUser = user;
      return { success: true, user };

    } catch (error) {
      return { success: false, error: 'Terjadi kesalahan saat login biometric' };
    }
  }

  async logout(): Promise<void> {
    // Hapus credentials dari storage
    await storageService.clearCredentials();
    this.currentUser = null;
  }

  forceLogout(): void {
    this.logout();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}

export const authService = new AuthService();