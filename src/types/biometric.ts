export type BiometricType = 'FaceID' | 'TouchID' | 'Biometrics' | null;

export interface BiometricInfo {
  available: boolean;
  biometryType: BiometricType;
  error?: string;
  errorCode?: string;
}

export interface BiometricPromptOptions {
  promptMessage: string;
  cancelButtonText?: string;
  fallbackPromptMessage?: string;
}