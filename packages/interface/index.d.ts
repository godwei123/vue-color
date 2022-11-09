import {ColorFormats, ColorInput} from "tinycolor2";


export interface HLSA {
    h: number;
    l: number;
    s: number;
    a: number;
}

type ColorFormat = "rgb" | "hex" | "hex8" | "hsl" | "hsv"
type Size = 'mini' | 'small' | 'default' | 'middle' | 'large'
type Direction = 'horizontal' | 'vertical'
type Placement =
    "hide"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"


interface ColorObject {
    origin: ColorInput,
    hex: string,
    hex8: string,
    hsl: ColorFormats.HSLA,
    rgb: ColorFormats.RGBA,
    hsv: ColorFormats.HSVA,
    percentageRgb: ColorFormats.PRGBA,
    hexString: string,
    hex8String: string,
    hslString: string,
    hsvString: string,
    rgbString: string,
    percentageRgbString: string
}

