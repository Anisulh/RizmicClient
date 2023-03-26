import { useMemo } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { HexColorPicker } from "react-colorful";
extend([namesPlugin]);

interface IColorPicker {
  color: string;
  colorType: "text" | "hex";
  [x: string]: unknown;
}

export default function ColorPicker({
  color,
  colorType,
  ...rest
}: IColorPicker) {
  const hexColorString = useMemo(() => {
    if (colorType === "text") {
      return colord(color).toHex();
    }
    if (colorType === "hex") {
      return color;
    }
  }, [color, colorType]);

  return <HexColorPicker color={hexColorString} {...rest} />;
}
