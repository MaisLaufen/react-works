import { TreeNode } from './colorBlenderTree'; // Убедитесь, что путь правильный
import { isWarmColor, isLightColor } from './colorUtils'; // Убедитесь, что путь правильный

export const buildColorTree = (colorA: string, colorB: string): TreeNode => {
  const typeA = { warm: isWarmColor(colorA), light: isLightColor(colorA) };
  const typeB = { warm: isWarmColor(colorB), light: isLightColor(colorB) };

  const resultNode: TreeNode = {
    id: 'result',
    type: 'color',
    name: 'Result',
    color: blendColors(colorA, colorB),
  };

  // A
  const colorANode: TreeNode = {
    id: colorA,
    type: 'color',
    name: colorA,
    color: colorA,
  };

  let colorAGroupNode: TreeNode;
  if (typeA.warm) {
    colorAGroupNode = {
      id: 'warm_a',
      type: 'warm',
      name: 'Теплый',
      children: [colorANode],
    };
    if (typeA.light) {
      colorAGroupNode = {
        id: 'light_a',
        type: 'light',
        name: 'Светлый',
        children: [colorAGroupNode],
      };
    } else {
      colorAGroupNode = {
        id: 'dark_a',
        type: 'dark',
        name: 'Темный',
        children: [colorAGroupNode],
      };
    }
  } else {
    colorAGroupNode = {
      id: 'cool_a',
      type: 'cool',
      name: 'Холодный',
      children: [colorANode],
    };
    if (typeA.light) {
      colorAGroupNode = {
        id: 'light_a',
        type: 'light',
        name: 'Светлый',
        children: [colorAGroupNode],
      };
    } else {
      colorAGroupNode = {
        id: 'dark_a',
        type: 'dark',
        name: 'Темный',
        children: [colorAGroupNode],
      };
    }
  }

  // B
  const colorBNode: TreeNode = {
    id: colorB,
    type: 'color',
    name: colorB,
    color: colorB,
  };

  let colorBGroupNode: TreeNode;
  if (typeB.warm) {
    colorBGroupNode = {
      id: 'warm_b',
      type: 'warm',
      name: 'Теплый',
      children: [colorBNode],
    };
    if (typeB.light) {
      colorBGroupNode = {
        id: 'light_b',
        type: 'light',
        name: 'Светлый',
        children: [colorBGroupNode],
      };
    } else {
      colorBGroupNode = {
        id: 'dark_b',
        type: 'dark',
        name: 'Темный',
        children: [colorBGroupNode],
      };
    }
  } else {
    colorBGroupNode = {
      id: 'cool_b',
      type: 'cool',
      name: 'Холодный',
      children: [colorBNode],
    };
    if (typeB.light) {
      colorBGroupNode = {
        id: 'light_b',
        type: 'light',
        name: 'Светлый',
        children: [colorBGroupNode],
      };
    } else {
      colorBGroupNode = {
        id: 'dark_b',
        type: 'dark',
        name: 'Темный',
        children: [colorBGroupNode],
      };
    }
  }

  const rootNode: TreeNode = {
    id: 'root',
    type: 'color',
    name: 'Дерево слияния для',
    children: [colorAGroupNode, colorBGroupNode],
    color: resultNode.color,
  };
  return rootNode;
};

const blendColors = (colorA: string, colorB: string): string => {
  const hexA = colorA.replace('#', '');
  const hexB = colorB.replace('#', '');

  const rA = parseInt(hexA.substring(0, 2), 16);
  const gA = parseInt(hexA.substring(2, 4), 16);
  const bA = parseInt(hexA.substring(4, 6), 16);

  const rB = parseInt(hexB.substring(0, 2), 16);
  const gB = parseInt(hexB.substring(2, 4), 16);
  const bB = parseInt(hexB.substring(4, 6), 16);

  const rAvg = Math.round((rA + rB) / 2);
  const gAvg = Math.round((gA + gB) / 2);
  const bAvg = Math.round((bA + bB) / 2);

  const blendedHex = `#${rAvg.toString(16).padStart(2, '0')}${gAvg.toString(16).padStart(2, '0')}${bAvg.toString(16).padStart(2, '0')}`;
  return blendedHex;
};