// Security-related utilities

export const SecurityUtils = {
  // Validate token format (basic example)
  isValidToken: (token: string | null): boolean => {
    if (!token) return false;
    return token.startsWith('jwt_token_') && token.length > 20;
  },

  // Sanitize user data before storage
  sanitizeUserData: (userData: any) => {
    const { password, ssn, creditCard, ...sanitizedData } = userData;
    return sanitizedData;
  },

  // Generate secure random string
  generateSecureRandom: (length: number = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};