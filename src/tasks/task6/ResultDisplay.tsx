import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useColorBlender } from './ColorBlenderContext';
import { withStyledContainer } from './withStyle';
import TreeNodeComponent from '../task7/TreeNode';
import { buildColorTree } from '../task7/buildColorTree';

const ResultDisplayComponent: React.FC = () => {
  const { result, selectionA, selectionB, blend } = useColorBlender();

  const canBlend = selectionA && selectionB;

  const treeRoot = selectionA && selectionB ? buildColorTree(selectionA, selectionB) : null;

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={blend}
        disabled={!canBlend}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: canBlend ? '#007AFF' : '#cccccc',
          borderRadius: 20,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Перемешать</Text>
      </TouchableOpacity>

      {result ? (
        <View style={{ alignItems: 'center', width: '100%' }}>
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
            <Text style={{ fontSize: 14, marginTop: 4, color: '#666' }}>
              {selectionA} + {selectionB} = {result}
            </Text>
          )}
          {treeRoot && (
            <>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16, alignSelf: 'flex-start', color: 'white' }}>Дерево:</Text>
              <ScrollView style={{ width: '100%', maxHeight: 300, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}>
                <TreeNodeComponent node={treeRoot} />
              </ScrollView>
            </>
          )}
        </View>
      ) : (
        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>No blend yet. Select two colors and press "Blend!"</Text>
      )}
    </View>
  );
};

export const ResultDisplay = withStyledContainer(ResultDisplayComponent);