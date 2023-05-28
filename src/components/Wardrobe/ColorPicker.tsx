import { useMemo } from "react";
import { RgbColor, colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { RgbColorPicker } from "react-colorful";
extend([namesPlugin]);

interface IColorPicker {
  color: string;
  [x: string]: unknown;
}

export default function ColorPicker({ color, ...rest }: IColorPicker) {
  const rgbColorString = useMemo((): RgbColor | undefined => {
    return colord(color).toRgb();
  }, []);

  return <RgbColorPicker color={rgbColorString} {...rest} />;
}
