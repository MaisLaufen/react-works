import { Alert } from 'react-native';
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

import { delayedFunction } from '../tasks/task1/delayedFunction';

afterEach(() => {
  (Alert.alert as jest.MockedFunction<typeof Alert.alert>).mockClear();
});

describe('delayedFunction TDD - queueLimit', () => {
  test('должна отклонять вызовы, если очередь превышает queueLimit', async () => {
    const mockFn = jest.fn().mockResolvedValue('result');
    const delayedFn = delayedFunction(mockFn, { delay: 100, queueLimit: 1 });
    const promise1 = delayedFn('arg1');
    await expect(delayedFn('arg2')).rejects.toThrow('Queue limit exceeded: 1');
    expect(Alert.alert).toHaveBeenCalledWith('Очередь вызова переполнена. Максимум: 1');
    await promise1;
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('arg1');
  });

  test('должна позволять вызовы, если очередь не превышает queueLimit', async () => {
    const mockFn = jest.fn().mockResolvedValue('result');
    const delayedFn = delayedFunction(mockFn, { delay: 100, queueLimit: 2 });
    const promise1 = delayedFn('arg1');
    const promise2 = delayedFn('arg2');
    await expect(delayedFn('arg3')).rejects.toThrow('Queue limit exceeded: 2');
    expect(Alert.alert).toHaveBeenCalledWith('Очередь вызова переполнена. Максимум: 2');
    await promise1;
    await promise2;
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenNthCalledWith(1, 'arg1');
    expect(mockFn).toHaveBeenNthCalledWith(2, 'arg2');
  });

  test('должна отклонять все вызовы, если queueLimit = 0', async () => {
    const mockFn = jest.fn().mockResolvedValue('result');
    const delayedFn = delayedFunction(mockFn, { delay: 100, queueLimit: 0 });
    await expect(delayedFn('arg1')).rejects.toThrow('Queue limit exceeded: 0');
    expect(Alert.alert).toHaveBeenCalledWith('Очередь вызова переполнена. Максимум: 0');
    expect(mockFn).not.toHaveBeenCalled();
  });
});