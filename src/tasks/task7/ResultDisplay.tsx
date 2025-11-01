import React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { withStyledContainer } from '../task6_1/withStyle';
import colorBlenderStore from './colorBlenderStore';

const ResultDisplayComponent: React.FC = observer(() => {
  const { blendedResult, selectionA, selectionB } = colorBlenderStore;

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      {blendedResult ? (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: 'white' }}>Результат</Text>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: blendedResult,
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 10,
              marginBottom: 8,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{blendedResult}</Text>
          {selectionA && selectionB && (
            <Text style={{ fontSize: 14, marginTop: 4, color: '#666' }}>
              {selectionA} + {selectionB} = {blendedResult}
            </Text>
          )}
        </View>
      ) : (
        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>Выберите два цвета, чтобы смешать их</Text>
      )}
    </View>
  );
});

export const ResultDisplay = withStyledContainer(ResultDisplayComponent);