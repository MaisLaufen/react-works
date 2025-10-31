const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const isWarmColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;

  // если R больше G и B, считаем тёплым
  return rgb.r > rgb.g && rgb.r > rgb.b;
};

// является ли цвет светлым (среднее RGB > 128)
export const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const brightness = (rgb.r + rgb.g + rgb.b) / 3;
  return brightness > 128;
};