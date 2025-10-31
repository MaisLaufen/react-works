import React, { createContext, useContext, useReducer } from 'react';
import { ColorBlenderContextType, ColorBlenderState } from './types/colorBlender';

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

type Action =
  | { type: 'SET_SELECTION_A'; payload: string }
  | { type: 'SET_SELECTION_B'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'CLEAR_RESULT' };

const initialState: ColorBlenderState = {
  selectionA: null,
  selectionB: null,
  result: null,
};

const blenderReducer = (state: ColorBlenderState, action: Action): ColorBlenderState => {
  switch (action.type) {
    case 'SET_SELECTION_A':
      return { ...state, selectionA: action.payload, result: null };
    case 'SET_SELECTION_B':
      return { ...state, selectionB: action.payload, result: null };
    case 'SET_RESULT':
      return { ...state, result: action.payload };
    case 'CLEAR_RESULT':
      return { ...state, result: null };
    default:
      return state;
  }
};

const ColorBlenderContext = createContext<ColorBlenderContextType | undefined>(undefined);

export const useColorBlender = (): ColorBlenderContextType => {
  const context = useContext(ColorBlenderContext);
  if (!context) {
    throw new Error('useColorBlender must be used within a ColorBlenderProvider');
  }
  return context;
};

export const ColorBlenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blenderReducer, initialState);

  const setSelectionA = (color: string) => {
    dispatch({ type: 'SET_SELECTION_A', payload: color });
  };

  const setSelectionB = (color: string) => {
    dispatch({ type: 'SET_SELECTION_B', payload: color });
  };

  const blend = () => {
    if (state.selectionA && state.selectionB) {
      const blendedResult = blendColors(state.selectionA, state.selectionB);
      dispatch({ type: 'SET_RESULT', payload: blendedResult });
    }
  };

  const value = {
    selectionA: state.selectionA,
    selectionB: state.selectionB,
    result: state.result,
    setSelectionA,
    setSelectionB,
    blend,
  };

  return <ColorBlenderContext.Provider value={value}>{children}</ColorBlenderContext.Provider>;
};