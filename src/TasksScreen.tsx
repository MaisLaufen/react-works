import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createTaskHandlers } from './taskHandler';
import { ListScreenRefactored } from './tasks/task4/ListScreenRefactored';
import { useAsyncStorage } from './tasks/task5/asyncStorageHook';

export const TasksScreen = () => {
  const [message, setMessage] = useState<string>("");
  const [showRefactoredList, setShowRefactoredList] = useState(false);
  const [task5Count, setTask5Count] = useAsyncStorage<number>('task5ExecutionCount', 0);

  const handleTask5WithStorage = async () => {
    setTask5Count(prevCount => prevCount + 1);
  };

  const {
    handleTask1,
    handleTask2,
    handleTask3,
    handleTask4,
    handleTask5,
    handleTask6,
    handleTask7,
    handleTask8,
    handleTask9,
  } = createTaskHandlers(setMessage);

  const tasks = [
    { id: "1", title: "Задание 1", onPress: handleTask1 },
    { id: "2", title: "Задание 2", onPress: handleTask2 },
    { id: "3", title: "Задание 3", onPress: handleTask3 },
    { id: "4", title: "Задание 4", onPress: () => setShowRefactoredList(true) },
    { id: "5", title: `Задание 5 (Нажато: ${task5Count}) раз`, onPress: handleTask5WithStorage }, // Обновляем onPress и title
    { id: "6", title: "Задание 6", onPress: handleTask6 },
    { id: "7", title: "Задание 7", onPress: handleTask7 },
    { id: "8", title: "Задание 8", onPress: handleTask8 },
    { id: "9", title: "Задание 9", onPress: handleTask9 },
  ];

   if (showRefactoredList) {
    return <ListScreenRefactored onBack={() => setShowRefactoredList(false)} />;
  }

  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
    <TouchableOpacity style={styles.button} onPress={item.onPress}>
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ПИР Ефтифанов</Text>
      <Text style={styles.subtitle}>Задачи</Text>
      <Text style={styles.message}>{message}</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#565656',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#2eba7bff'
  },
  list: {
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#393939',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TasksScreen;