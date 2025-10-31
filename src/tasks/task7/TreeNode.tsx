import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TreeNode, TreeNodeType } from './colorBlenderTree';

interface TreeNodeProps {
  node: TreeNode;
  depth?: number;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const indent = depth * 20;

  const getStyle = (type: TreeNodeType) => {
    switch (type) {
      case 'warm': return styles.warmGroup;
      case 'cool': return styles.coolGroup;
      case 'light': return styles.lightGroup;
      case 'dark': return styles.darkGroup;
      case 'color': return styles.colorLeaf;
      default: return styles.defaultStyle;
    }
  };

  return (
    <View style={{ marginLeft: indent }}>
      <TouchableOpacity style={[styles.node, getStyle(node.type)]}>
        <Text style={styles.nodeName}>{node.name}</Text>
        {node.type === 'color' && node.color && (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: node.color,
              borderWidth: 1,
              borderColor: '#000',
              marginLeft: 8,
            }}
          />
        )}
      </TouchableOpacity>
      {node.children && node.children.length > 0 && (
        <View>
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} depth={depth + 1} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 2,
    borderRadius: 4,
  },
  warmGroup: {
    backgroundColor: '#FFEBE6',
    borderColor: '#FF6B6B',
    borderWidth: 1,
  },
  coolGroup: {
    backgroundColor: '#E6F7FF',
    borderColor: '#6B9DFF',
    borderWidth: 1,
  },
  lightGroup: {
    backgroundColor: '#FFFBE6',
    borderColor: '#FFD966',
    borderWidth: 1,
  },
  darkGroup: {
    backgroundColor: '#E6E6E6',
    borderColor: '#808080',
    borderWidth: 1,
  },
  colorLeaf: {
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  defaultStyle: {
    backgroundColor: '#F9F9F9',
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  nodeName: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TreeNodeComponent;