import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

interface ControlButtonProps {
  title: string;
  onPress: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.controlButton}>
    <Text style={styles.controlButtonText}>{title}</Text>
  </TouchableOpacity>
);