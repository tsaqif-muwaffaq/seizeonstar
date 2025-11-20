import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

export const useRetry = (options: RetryOptions = {}) => {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2
  } = options;

  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const calculateDelay = (attempt: number): number => {
    const delay = initialDelay * Math.pow(backoffFactor, attempt);
    return Math.min(delay, maxDelay);
  };

  const retry = useCallback(async <T>(
    operation: () => Promise<T>,
    onRetry?: (attempt: number) => void
  ): Promise<T> => {
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          setIsRetrying(true);
          setRetryCount(attempt);
          onRetry?.(attempt);
          
          const delay = calculateDelay(attempt - 1);
          console.log(`Retry attempt ${attempt} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const result = await operation();
        
        // Reset on success
        if (attempt > 0) {
          setIsRetrying(false);
          setRetryCount(0);
        }
        
        return result;

      } catch (error: any) { // FIX: Added type annotation
        lastError = error;
        console.log(`Attempt ${attempt + 1} failed:`, error);

        // Don't retry for auth errors
        if (error?.code === 'AUTH_ERROR') {
          break;
        }

        // Check if we should retry
        if (attempt === maxRetries) {
          setIsRetrying(false);
          throw lastError;
        }
      }
    }

    setIsRetrying(false);
    throw lastError;
  }, [maxRetries, initialDelay, maxDelay, backoffFactor]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return {
    retry,
    retryCount,
    isRetrying,
    reset
  };
};

export default useRetry;