import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorBlender } from './ColorBlenderContext';
import { withStyledContainer } from './withStyle';

const ResultDisplayComponent: React.FC = () => {
  const { result, selectionA, selectionB, blend } = useColorBlender();

  const canBlend = selectionA && selectionB;

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={blend}
        disabled={!canBlend}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: canBlend ? '#079815ff' : '#cccccc',
          borderRadius: 20,
          marginBottom: 16,
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Смешать цвета</Text>
      </TouchableOpacity>

      {result ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'white' }}>Результат:</Text>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: result,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 10,
              marginBottom: 8,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{result}</Text>
          {selectionA && selectionB && (
            <Text style={{ fontSize: 14, marginTop: 4, color: '#8d8d8dff' }}>
              {selectionA} + {selectionB} = {result}
            </Text>
          )}
        </View>
      ) : (
        <Text style={{ fontSize: 16, color: 'white' }}>Выберите два цвета и нажмите кнопку "Смешать цвета", чтобы увидеть результат</Text>
      )}
    </View>
  );
};

export const ResultDisplay = withStyledContainer(ResultDisplayComponent);