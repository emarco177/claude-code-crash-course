/**
 * LocalStorage management with error handling
 */

export class Storage {
  /**
   * Saves data to LocalStorage
   */
  static set<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded");
      } else {
        console.error("Error saving to LocalStorage:", error);
      }
      return false;
    }
  }

  /**
   * Gets data from LocalStorage
   */
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error("Error reading from LocalStorage:", error);
      return defaultValue;
    }
  }

  /**
   * Removes data from LocalStorage
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from LocalStorage:", error);
    }
  }

  /**
   * Clears all data from LocalStorage
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing LocalStorage:", error);
    }
  }

  /**
   * Gets available LocalStorage space (approximate)
   */
  static getUsagePercentage(): number {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      // Most browsers have ~5-10MB limit, using 5MB as conservative estimate
      const limit = 5 * 1024 * 1024;
      return (total / limit) * 100;
    } catch (error) {
      console.error("Error calculating storage usage:", error);
      return 0;
    }
  }

  /**
   * Exports all data as JSON string
   */
  static exportData(): string {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("budget_")) {
        data[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(data, null, 2);
  }

  /**
   * Imports data from JSON string
   */
  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith("budget_")) {
          localStorage.setItem(key, value as string);
        }
      }
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }
}
