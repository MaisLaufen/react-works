import { Alert } from "react-native";

export type DebounceQueueOptions = {
  delay: number;
  delaySinceCompletion?: boolean;
  waitForPrevious?: boolean;
  queueLimit?: number;
};

type QueueItem<T extends (...args: any[]) => any> = {
  args: Parameters<T>;
  resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void;
  reject: (reason?: any) => void;
};

export function delayedFunction<T extends (...args: any[]) => any>(
  fn: T,
  {
    delay,
    delaySinceCompletion = false,
    waitForPrevious = false,
    queueLimit = Infinity,
  }: DebounceQueueOptions
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let lastCallTime = 0;
  let lastCompletionTime = 0;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let isRunning = false;
  let activeCount = 0;

  const queue: QueueItem<T>[] = [];

  const executeNext = async () => {
    if (isRunning || queue.length === 0) {
      if (queue.length === 0 && timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      return;
    }

    const now = Date.now();

    const referenceTime = delaySinceCompletion ? lastCompletionTime : lastCallTime;
    const elapsed = now - referenceTime;

    if (elapsed < delay) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(executeNext, delay - elapsed);
      return;
    }

    const { args, resolve, reject } = queue.shift()!;
    isRunning = true;
    activeCount++;

    try {
      if (!delaySinceCompletion) {
        lastCallTime = Date.now();
      }
      const result = await fn(...args);
      if (delaySinceCompletion) {
        lastCompletionTime = Date.now();
      }

      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      isRunning = false;
      activeCount--;

      if (waitForPrevious) {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          executeNext();
        }, delay);
      } else {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          executeNext();
        }, 0);
      }
    }
  };

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      const currentLoad = activeCount + queue.length;
      if (currentLoad >= queueLimit) {
        Alert.alert(`Очередь вызова переполнена. Максимум: ${queueLimit}`);
        return;
      }
      queue.push({ args, resolve, reject });
      if (!isRunning && activeCount === 0 && queue.length === 1) {
        const now = Date.now();
        const referenceTime = delaySinceCompletion ? lastCompletionTime : lastCallTime;
        const elapsed = now - referenceTime;
        if (elapsed < delay) {
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(() => {
            executeNext();
          }, delay - elapsed);
        } else {
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(() => {
            executeNext();
          }, 0);
        }
      }
    });
  };
}