import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ColorSelectorA, ColorSelectorB } from './colorSelector';
import { ResultDisplay } from './ResultDisplay';

const ColorBlenderComponent: React.FC = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Блендер цветов (MobX)</Text>
      <ColorSelectorA />
      <ColorSelectorB />
      <ResultDisplay />
    </View>
  );
});

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
    color: 'white',
  },
});

export default ColorBlenderComponent;