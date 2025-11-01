import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorBlender } from './ColorBlenderContext';
import { withStyledContainer } from './withStyle';

interface ColorSelectorProps {
  title: string;
  onSelect: (color: string) => void;
  selectedColor: string | null;
}

const ColorSelectorComponent: React.FC<ColorSelectorProps> = ({ title, onSelect, selectedColor }) => {
  const predefinedColors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#000000',
    '#FFFFFF',
  ];

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'white' }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, marginRight: 8, color: 'white' }}>Выбрано:</Text>
        {selectedColor ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: selectedColor,
                borderWidth: 1,
                borderColor: '#000',
                marginRight: 8,
              }}
            />
            <Text style={{ fontSize: 16, color: 'white' }}>{selectedColor}</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 16, color: 'white' }}>Ничего</Text>
        )}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {predefinedColors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onSelect(color)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: color,
              margin: 4,
              borderRadius: 20,
              borderWidth: selectedColor === color ? 2 : 1,
              borderColor: selectedColor === color ? '#ff0000ff' : '#ccc',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export const ColorSelectorA = withStyledContainer(() => {
  const { selectionA, setSelectionA } = useColorBlender();
  return <ColorSelectorComponent title="Выберите цвет №1" onSelect={setSelectionA} selectedColor={selectionA} />;
});

export const ColorSelectorB = withStyledContainer(() => {
  const { selectionB, setSelectionB } = useColorBlender();
  return <ColorSelectorComponent title="Выберите цвет №2" onSelect={setSelectionB} selectedColor={selectionB} />;
});