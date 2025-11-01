import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import colorBlenderStore from './colorBlenderStore';
import { withStyledContainer } from '../task6_1/withStyle';

interface ColorSelectorProps {
  title: string;
  isSelectorA: boolean;
}

const ColorSelectorComponent: React.FC<ColorSelectorProps> = observer(({ title, isSelectorA }) => { 
  const currentSelection = isSelectorA ? colorBlenderStore.selectionA : colorBlenderStore.selectionB;
  const setSelection = isSelectorA ? colorBlenderStore.setSelectionA : colorBlenderStore.setSelectionB;

  console.log(`ColorSelector ${title} read selection from store:`, currentSelection);

  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#00FFFF', '#FFA500', '#800080', '#000000', '#FFFFFF',
  ];

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'white' }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, marginRight: 8, color: 'white' }}>Выбрано:</Text>
        {currentSelection ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: currentSelection,
                borderWidth: 1,
                borderColor: '#000',
                marginRight: 8,
              }}
            />
            <Text style={{ fontSize: 16, color: 'white' }}>{currentSelection}</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 16, fontStyle: 'italic', color: 'white' }}>Ничего</Text>
        )}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {predefinedColors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelection(color)}
            style={{
              width: 40,
              height: 40,
              backgroundColor: color,
              margin: 4,
              borderRadius: 20,
              borderWidth: currentSelection === color ? 2 : 1,
              borderColor: currentSelection === color ? '#000' : '#ccc',
            }}
          />
        ))}
      </View>
    </View>
  );
});

export const ColorSelectorA = withStyledContainer(() => (
  <ColorSelectorComponent
    title="Цвет №1"
    isSelectorA={true}
  />
));

export const ColorSelectorB = withStyledContainer(() => (
  <ColorSelectorComponent
    title="Цвет №2"
    isSelectorA={false}
  />
));