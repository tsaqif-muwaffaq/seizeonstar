// import { useState, useEffect, useCallback } from 'react';
// import { Storage, STORAGE_KEYS } from '../utils/storage';


// const TTL = {
//   MEDIUM: 30 * 60 * 1000, // 30 minutes
// } as const;

// export const useCache = <T>(
//   key: string, 
//   fetchFn: () => Promise<T>
// ) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadFromCache = useCallback(async (): Promise<boolean> => {
//     try {
//       const cached = await Storage.getItem<{value: T; timestamp: number}>(key);
//       if (cached && (Date.now() - cached.timestamp < TTL.MEDIUM)) {
//         setData(cached.value);
//         return true;
//       }
//       return false;
//     } catch (err) {
//       console.error(`Cache load error for ${key}:`, err);
//       return false;
//     }
//   }, [key]);

//   const fetchData = useCallback(async () => {
//     try {
//       setError(null);
//       const freshData = await fetchFn();
      
//       // Save to cache with timestamp
//       await Storage.setItem(key, {
//         value: freshData,
//         timestamp: Date.now()
//       });
      
//       setData(freshData);
//       return freshData;
//     } catch (err) {
//       const errorMsg = `Failed to fetch data for ${key}`;
//       setError(errorMsg);
//       console.error(errorMsg, err);
//       throw err;
//     }
//   }, [key, fetchFn]);

//   const refresh = useCallback(async () => {
//     setLoading(true);
//     try {
//       await fetchData();
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchData]);

//   // Cache-first strategy
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
      
//       // Try cache first
//       const cacheHit = await loadFromCache();
      
//       // If cache miss, fetch from network
//       if (!cacheHit) {
//         try {
//           await fetchData();
//         } catch (err) {
//           // Error already handled in fetchData
//         }
//       }
      
//       setLoading(false);
//     };

//     loadData();
//   }, [loadFromCache, fetchData]);

//   const invalidate = useCallback(async () => {
//     await Storage.removeItem(key);
//     setData(null);
//   }, [key]);

//   return {
//     data,
//     loading,
//     error,
//     refresh,
//     invalidate,
//   };
// };

// // Specific cache for categories
// export const useCategoriesCache = (fetchFn: () => Promise<any>) => {
//   return useCache(STORAGE_KEYS.CATEGORIES_CACHE, fetchFn);
// };

import { useState, useEffect, useCallback, useRef } from 'react';
import { Storage, STORAGE_KEYS } from '../utils/storage';

const TTL = {
  MEDIUM: 30 * 60 * 1000, // 30 minutes
} as const;

export const useCache = <T>(
  key: string, 
  fetchFn: () => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref untuk fetchFn untuk prevent infinite re-render
  const fetchFnRef = useRef(fetchFn);
  
  // Update ref ketika fetchFn berubah
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const loadFromCache = useCallback(async (): Promise<boolean> => {
    try {
      const cached = await Storage.getItem<{value: T; timestamp: number}>(key);
      if (cached && (Date.now() - cached.timestamp < TTL.MEDIUM)) {
        setData(cached.value);
        return true;
      }
      return false;
    } catch (err) {
      console.error(`Cache load error for ${key}:`, err);
      return false;
    }
  }, [key]);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // Use ref.current instead of fetchFn directly
      const freshData = await fetchFnRef.current();
      
      // Save to cache with timestamp
      await Storage.setItem(key, {
        value: freshData,
        timestamp: Date.now()
      });
      
      setData(freshData);
      return freshData;
    } catch (err) {
      const errorMsg = `Failed to fetch data for ${key}`;
      setError(errorMsg);
      console.error(errorMsg, err);
      throw err;
    }
  }, [key]); // fetchFn dihapus dari dependencies

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await fetchData();
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Cache-first strategy - FIXED: remove fetchData from dependencies
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Try cache first
      const cacheHit = await loadFromCache();
      
      // If cache miss, fetch from network
      if (!cacheHit) {
        try {
          await fetchData();
        } catch (err) {
          // Error already handled in fetchData
        }
      }
      
      setLoading(false);
    };

    loadData();
  }, [loadFromCache]); // HAPUS fetchData dari dependencies array

  const invalidate = useCallback(async () => {
    await Storage.removeItem(key);
    setData(null);
  }, [key]);

  return {
    data,
    loading,
    error,
    refresh,
    invalidate,
  };
};

// Specific cache for categories
export const useCategoriesCache = (fetchFn: () => Promise<any>) => {
  return useCache(STORAGE_KEYS.CATEGORIES_CACHE, fetchFn);
};