import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface StatsViewProps {
  renderCount: number;
}

export const StatsView: React.FC<StatsViewProps> = ({ renderCount }) => (
  <View>
    <Text style={styles.statsText}>Was rendered: {renderCount}</Text>
  </View>
);