import { Alert } from "react-native";

export type DebounceQueueOptions = {
  delay: number;
  delaySinceCompletion?: boolean;
  waitForPrevious?: boolean;
  queueLimit?: number;
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
  let timer: ReturnType<typeof setTimeout> | null = null;
  let running = false;
  let totalActive = 0;

  const queue: {
    args: Parameters<T>;
    resolve: (v: any) => void;
    reject: (e: any) => void;
  }[] = [];

  const executeNext = async () => {
    // ничего не делаем, если уже идёт выполнение или очередь пуста
    if (running || queue.length === 0) return;

    const now = Date.now();
    const since = delaySinceCompletion ? lastCompletionTime : lastCallTime;
    const elapsed = now - since;

    if (elapsed < delay) {
      timer = setTimeout(executeNext, delay - elapsed);
      return;
    }

    const { args, resolve, reject } = queue.shift()!;
    running = true;
    totalActive++;
    lastCallTime = Date.now();

    try {
      const result = await fn(...args);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      running = false;
      totalActive--;
      lastCompletionTime = Date.now();

      if (waitForPrevious) {
        timer = setTimeout(executeNext, delay);
      } else {
        executeNext();
      }
    }
  };

  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      const currentLoad = totalActive + queue.length;
      if (currentLoad >= queueLimit) {
        Alert.alert(`Очередь вызова переполнена. Максимум: ${queueLimit}`);
        return;
      }

      queue.push({ args, resolve, reject });

      if (queue.length >= queueLimit) {
        if (!running) executeNext();
      } else {
        executeNext();
      }
    });
  };
}