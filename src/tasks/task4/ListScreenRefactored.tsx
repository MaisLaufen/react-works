import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useListScreenLogic } from "./hooks/useListScreenLogic";
import { BackButton } from "./components/BackButton";
import { ControlButton } from "./components/ControlButton";
import { StatsView } from "./components/StatsView";
import { SimpleComponentRefactored } from "./SimpleComponentRefactored";
import { styles } from "./styles";

export const ListScreenRefactored = ({ onBack }: { onBack: () => void }) => {
  const { data, random, addToTop, handleRender, renderCount } = useListScreenLogic();

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={onBack} />
      <View style={styles.statsContainer}>
          <StatsView renderCount={renderCount} />
          <ControlButton title="random" onPress={random} />
          <ControlButton title="add to top" onPress={addToTop} />
      </View>
      <ScrollView style={styles.listContainer}>
          {data.map(item => (
            <SimpleComponentRefactored
              key={item.id}
              number={item.number}
              onRender={handleRender}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};