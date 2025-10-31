import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorSelectorA, ColorSelectorB } from './ColorSelector';
import { ResultDisplay } from './ResultDisplay';

const ColorBlender: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Блендер цветов</Text>
      <ColorSelectorA />
      <ColorSelectorB />
      <ResultDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
});

export default ColorBlender;