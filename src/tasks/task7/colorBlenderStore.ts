import { makeAutoObservable, reaction, computed, runInAction } from 'mobx';

class ColorBlenderStore {
  selectionA: string | null = null;
  selectionB: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      blendedResult: computed,
      isBlendingPossible: computed,
    });

    reaction(
      () => [this.selectionA, this.selectionB],
      ([newA, newB]) => {
        if (newA !== null && newB !== null) {
          console.log("Reaction triggered: blending", newA, "and", newB);
          this.blend();
        } else {
          console.log("Reaction triggered: one selection is null, clearing result");
          runInAction(() => {
            this._result = null;
          });
        }
      },
      { fireImmediately: true }
    );
  }

  setSelectionA = (color: string) => {
    this.selectionA = color;
  };

  setSelectionB = (color: string) => {
    this.selectionB = color;
  };

  private _result: string | null = null;

  get isBlendingPossible() {
    return this.selectionA !== null && this.selectionB !== null;
  }

  get blendedResult() {
    return this._result;
  }

  blend = () => {
    if (this.selectionA && this.selectionB) {
      console.log("Running blend logic in store");
      const hexA = this.selectionA.replace('#', '');
      const hexB = this.selectionB.replace('#', '');

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

      runInAction(() => {
        this._result = blendedHex;
      });
    } else {
       runInAction(() => {
        this._result = null;
      });
    }
  };

  getResult = () => {
    return this.blendedResult;
  };

  clearSelections = () => {
    runInAction(() => {
      this.selectionA = null;
      this.selectionB = null;
    });
  };
}

const colorBlenderStore = new ColorBlenderStore();
export default colorBlenderStore;