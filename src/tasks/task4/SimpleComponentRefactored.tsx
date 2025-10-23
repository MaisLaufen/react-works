import React, { useCallback, memo } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface SimpleComponentProps {
  number: number;
  onRender: () => void;
}

const propsAreEqual = (
  prevProps: SimpleComponentProps,
  nextProps: SimpleComponentProps
) => {
  return prevProps.number === nextProps.number;
};

export const SimpleComponentRefactored = memo(({ number, onRender }: SimpleComponentProps) => {
  onRender();

  const onPress = useCallback(() => {
    Alert.alert("Number", number.toString());
  }, [number]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.containerSC, styles.textSC]}>
        Number: {number}
      </Text>
    </TouchableOpacity>
  );
}, propsAreEqual);