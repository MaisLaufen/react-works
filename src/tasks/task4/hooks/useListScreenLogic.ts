import { useRef, useState, useCallback } from "react";

interface Item {
  number: number;
  id: string;
}

export const useListScreenLogic = () => {
  const componentRerenderedTimes = useRef(0); // Из-за того, что значение передается после рендера, это число отстает на 1 итерацию.

  const [data, setData] = useState<Item[]>(() =>
    new Array(1000)
      .fill(null)
      .map((_, index) => ({ number: 0, id: String(index + 1) }))
  );

  const random = useCallback(() => {
    setData(prevData =>
      prevData.map(item => ({
        ...item,
        number: Math.floor(1 + Math.random() * 10),
      }))
    );
  }, []);

  const addToTop = useCallback(() => {
    setData(prevData => [{ number: 0, id: String(Math.random()) }, ...prevData]);
  }, []);

  const handleRender = useCallback(() => {
    componentRerenderedTimes.current++;
  }, []);

  return {
    data,
    random,
    addToTop,
    handleRender,
    renderCount: componentRerenderedTimes.current,
  };
};