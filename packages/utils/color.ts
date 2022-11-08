import tinycolor, {ColorFormats, ColorInput, ColorInputWithoutInstance, Instance} from 'tinycolor2'
import {ColorFormat, ColorObject} from "../interface";

// export const simpleCheckForValidColor = (data) => {
//     const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
//     let checked = 0
//     let passed = 0
//     keysToCheck.forEach((letter) => {
//         if (data[letter]) {
//             checked += 1
//             if (!isNaN(data[letter])) {
//                 passed += 1
//             }
//             if (letter === 's' || letter === 'l') {
//                 const percentPatt = /^\d+%$/
//                 if (percentPatt.test(data[letter])) {
//                     passed += 1
//                 }
//             }
//         }
//     })
//     return (checked === passed) ? data : false
// }
//
// export const toState = (data: string | { hex: number }, oldHue?: string) => {
//     const color = data.hex ? tinycolor(data.hex) : tinycolor(data)
//     const hsl = color.toHsl()
//     const hsv = color.toHsv()
//     const rgb = color.toRgb()
//     const hex = color.toHex()
//     if (hsl.s === 0) {
//         hsl.h = oldHue || 0
//         hsv.h = oldHue || 0
//     }
//     const transparent = hex === '000000' && rgb.a === 0
//
//     return {
//         hsl,
//         hex: transparent ? 'transparent' : `#${hex}`,
//         rgb,
//         hsv,
//         oldHue: data.h || oldHue || hsl.h,
//         source: data.source,
//     }
// }
//
// export const isValidHex = (hex) => {
//     if (hex === 'transparent') {
//         return true
//     }
//     // disable hex4 and hex8
//     const lh = (String(hex).charAt(0) === '#') ? 1 : 0
//     return hex.length !== (4 + lh) && hex.length < (7 + lh) && tinycolor(hex).isValid()
// }
//
export const getContrastingColor = (data: ColorObject | ColorInput) => {
    if (!(data as ColorObject)?.origin) {
        data = convertColor(data as ColorInput)
    }
    data = <ColorObject>data;
    if (!data) {
        return '#fff'
    }

    if (data.hex === 'transparent') {
        return 'rgba(0,0,0,0.4)'
    }
    const yiq = ((data.rgb.r * 299) + (data.rgb.g * 587) + (data.rgb.b * 114)) / 1000
    return (yiq >= 128) ? '#000' : '#fff'
}

// export const red = {
//     hsl: {a: 1, h: 0, l: 0.5, s: 1},
//     hex: '#ff0000',
//     rgb: {r: 255, g: 0, b: 0, a: 1},
//     hsv: {h: 0, s: 1, v: 1, a: 1},
// }
//
// export const isvalidColorString = (string, type) => {
//     const stringWithoutDegree = string.replace('°', '')
//     return tinycolor(`${type} (${stringWithoutDegree})`)._ok
// }

export const colorEquals = (color1: ColorObject, color2: ColorInput) => {
    const c1 = tinycolor(color1.origin)
    const c2 = tinycolor(color2)
    return tinycolor.equals(c1, c2);
}
export const convertColor = (color: ColorInput): ColorObject => {
    const c = tinycolor(color)
    const t = tinycolor(c)
    if (!c.isValid()) {
        console.log("color", color)
        throw new Error("color is error")
    }
    return {
        origin: color,
        hex: c.toHex(),
        hex8: c.toHex8(),
        hsl: c.toHsl(),
        rgb: c.toRgb(),
        hsv: c.toHsv(),
        percentageRgb: c.toPercentageRgb(),
        hexString: c.toHexString(),
        hex8String: c.toHex8String(),
        hslString: c.toHslString(),
        hsvString: c.toHsvString(),
        rgbString: c.toRgbString(),
        percentageRgbString: c.toPercentageRgbString()
    }
}


export const formatColor = (color: ColorObject | string, format: ColorFormat) => {
    return tinycolor(typeof color === 'string' ? color : color.origin).toString(format);
}


export const toHex = (val: number) => {
    if (val < 0) return '00';
    if (val > 255) return 'ff'
    const res = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    return `${res[Math.floor(val / 16)]}${res[val % 16]}`;
}
export const isValid = (val: unknown) => {
    const set = new Set<string>(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f'])
    return String(val).split("").every(it => set.has(it))
}
