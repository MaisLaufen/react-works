import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.backButton}>
    <Text style={styles.backButtonText}>Назад</Text>
  </TouchableOpacity>
);