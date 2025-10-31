export interface ColorBlenderState {
  selectionA: string | null; // HEX 
  selectionB: string | null; // HEX
  result: string | null;
}

export interface ColorBlenderContextType extends ColorBlenderState {
  setSelectionA: (color: string) => void;
  setSelectionB: (color: string) => void;
  blend: () => void;
}