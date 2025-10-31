import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Пользовательский хук для синхронизации значения состояния с AsyncStorage.
 *
 * @param key - Ключ, под которым значение будет храниться в AsyncStorage.
 * @param initialValue - Начальное значение состояния.
 * @returns Массив, где первый элемент - текущее значение, второй - функция для его обновления.
 */
export const useAsyncStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => Promise<void>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Загружаем значение из AsyncStorage при монтировании компонента
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          // Если значение найдено в AsyncStorage, обновляем состояние
          setStoredValue(JSON.parse(item));
        } else {
          // Если значение не найдено, сохраняем initialValue в AsyncStorage
          await AsyncStorage.setItem(key, JSON.stringify(initialValue));
        }
      } catch (error) {
        console.error(`Error reading from AsyncStorage with key: ${key}`, error);
      }
    };
    loadStoredValue();
  }, [key, initialValue]);

  const setValue = async (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to AsyncStorage with key: ${key}`, error);
    }
  };
  return [storedValue, setValue];
};