"use client";

import { useState, useEffect, useCallback } from "react";
import { Storage } from "@/lib/storage";

/**
 * Hook for syncing state with LocalStorage
 * Includes debouncing to avoid excessive writes
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  debounceMs: number = 500
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    return Storage.get(key, initialValue);
  });

  // Debounced save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = setTimeout(() => {
      Storage.set(key, storedValue);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [key, storedValue, debounceMs]);

  // Wrapper to allow both direct values and updater functions
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      return newValue;
    });
  }, []);

  return [storedValue, setValue];
}
