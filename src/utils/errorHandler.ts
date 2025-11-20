import { Alert } from 'react-native';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = false
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class StorageError extends AppError {
  constructor(message: string, public key?: string) {
    super(message, 'STORAGE_ERROR', true);
    this.name = 'StorageError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, public status?: number) {
    super(message, 'NETWORK_ERROR', true);
    this.name = 'NetworkError';
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', false);
    this.name = 'AuthError';
  }
}

class ErrorHandler {
  handle(error: any, context?: string): void {
    console.error(`Error in ${context}:`, error);

    if (error instanceof AppError) {
      this.handleAppError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error, context);
    } else {
      this.handleUnknownError(error, context);
    }
  }

  private handleAppError(error: AppError): void {
    if (error.recoverable) {
      Alert.alert(
        'Oops!',
        error.message,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Error',
        error.message,
        [{ text: 'OK' }]
      );
    }
  }

  private handleGenericError(error: Error, context?: string): void {
    Alert.alert(
      'Error',
      `Something went wrong${context ? ` in ${context}` : ''}. Please try again.`,
      [{ text: 'OK' }]
    );
  }

  private handleUnknownError(error: any, context?: string): void {
    Alert.alert(
      'Unknown Error',
      `An unexpected error occurred${context ? ` in ${context}` : ''}.`,
      [{ text: 'OK' }]
    );
  }

  // Specific error handlers
  handleStorageError(error: any, key?: string): void {
    if (error?.message?.includes('QuotaExceededError')) {
      this.handle(new StorageError('Storage quota exceeded. Please clear some data.', key));
    } else {
      this.handle(new StorageError('Failed to access storage. Data might be corrupted.', key));
    }
  }

  handleNetworkError(error: any, status?: number): void {
    // FIX: Check if status is defined before using it
    if (status === 401) {
      this.handle(new AuthError('Session expired. Please login again.'));
    } else if (status === 404) {
      this.handle(new NetworkError('Resource not found.', status));
    } else if (status && status >= 500) {
      this.handle(new NetworkError('Server error. Please try again later.', status));
    } else {
      this.handle(new NetworkError('Network connection failed. Please check your internet.', status));
    }
  }

  handleAuthError(error: any): void {
    this.handle(new AuthError('Authentication failed. Please login again.'));
  }
}

export default new ErrorHandler();