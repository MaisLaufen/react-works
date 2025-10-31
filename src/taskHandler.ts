import { Alert } from "react-native";
import { delayedFunction } from "./tasks/task1/delayedFunction";
import { createAutoProxyObject } from "./tasks/task2/autoProxyObject";

export const createTaskHandlers = (
  setMessage: (msg: string) => void
) => {

  // Задача 1
  const someFunctionInTask1 = async () => {
    setMessage("Выполняется задание...");
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setMessage("✅ Задание выполнено!");
  };

  const handleTask1 = delayedFunction(someFunctionInTask1, {
    delay: 3000,
    delaySinceCompletion: true,
    waitForPrevious: true,
    queueLimit: 1,
  });

  // Задача 2
  const handleTask2 = () => {
    const obj: Record<string, any> = createAutoProxyObject({ x: 10 });

    obj.a = 1;
    obj.b.c.d = 2;
    obj.e.f.g.h = 42;

    Alert.alert("Результат", JSON.stringify(obj, null, 2));
  };

  // Задача 3
  const handleTask3 = () => Alert.alert("Задание 3", "Описание задания 3");
  
  // Задача 4
  const handleTask4 = () => Alert.alert("Задание 4", "Описание задания 4");
  
  // Задача 5
  const handleTask5 = () => Alert.alert("Задание 5", "Описание задания 5");
  
  // Задача 6
  const handleTask6 = () => Alert.alert("Задание 6", "Описание задания 6");
  
  // Задача 7
  const handleTask7 = () => Alert.alert("Задание 7", "Описание задания 7");
  
  // Задача 8
  const handleTask8 = () => Alert.alert("Задание 8", "Описание задания 8");
  
  // Задача 9
  const handleTask9 = () => Alert.alert("Задание 9", "Описание задания 9");

  return {
    handleTask1,
    handleTask2,
    handleTask3,
    handleTask4,
    handleTask5,
    handleTask6,
    handleTask7,
    handleTask8,
    handleTask9,
  };
};