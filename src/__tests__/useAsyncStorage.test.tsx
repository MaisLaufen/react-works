import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAsyncStorage } from '../tasks/task5/asyncStorageHook';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useAsyncStorage', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.MockedFunction<any>).mockClear();
    (AsyncStorage.setItem as jest.MockedFunction<any>).mockClear();
  });

  test('должен загрузить начальное значение из AsyncStorage', async () => {
    const key = 'testKey';
    const storedValue = 'stored';
    (AsyncStorage.getItem as jest.MockedFunction<any>).mockResolvedValue(JSON.stringify(storedValue));

    const { result } = renderHook(() => useAsyncStorage(key, 'default'));

    await waitFor(() => {
      expect(result.current[0]).toBe(storedValue);
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
  });

  test('должен использовать initialValue, если значение в AsyncStorage отсутствует', async () => {
    const key = 'testKey2';
    (AsyncStorage.getItem as jest.MockedFunction<any>).mockResolvedValue(null);

    const { result } = renderHook(() => useAsyncStorage(key, 'default'));

    await waitFor(() => {
      expect(result.current[0]).toBe('default');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify('default'));
  });

  test('должен обновить состояние и сохранить в AsyncStorage', async () => {
    const key = 'testKey3';
    (AsyncStorage.getItem as jest.MockedFunction<any>).mockResolvedValue(null);

    const { result } = renderHook(() => useAsyncStorage(key, 'initial'));

    await waitFor(() => {
      expect(result.current[0]).toBe('initial');
    });

    await act(async () => {
      await result.current[1]('new_value');
    });

    expect(result.current[0]).toBe('new_value');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify('new_value'));
  });

  test('должен обновить состояние с помощью функции-обновителя', async () => {
    const key = 'testKey4';
    (AsyncStorage.getItem as jest.MockedFunction<any>).mockResolvedValue(JSON.stringify(10));

    const { result } = renderHook(() => useAsyncStorage(key, 0));

    await waitFor(() => {
      expect(result.current[0]).toBe(10);
    });

    await act(async () => {
      await result.current[1](prev => prev + 5);
    });

    expect(result.current[0]).toBe(15);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(15));
  });
});