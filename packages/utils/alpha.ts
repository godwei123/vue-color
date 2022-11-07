import {ColorFormats, ColorInput} from "tinycolor2";
import {convertColor} from "./color";

export const calculateChange = (e: any, hsl: ColorFormats.HSLA, direction: string, initialA: number, container: HTMLElement) => {
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
    const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
    const left = x - (container.getBoundingClientRect().left + window.pageXOffset)
    const top = y - (container.getBoundingClientRect().top + window.pageYOffset)
    if (direction === 'vertical') {
        let a
        if (top < 0) {
            a = 0
        } else if (top > containerHeight) {
            a = 1
        } else {
            a = Math.round((top * 100) / containerHeight) / 100
        }

        if (hsl.a !== a) {
            return convertColor({
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a,
            })
        }
    } else {
        let a
        if (left < 0) {
            a = 0
        } else if (left > containerWidth) {
            a = 1
        } else {
            a = Math.round((left * 100) / containerWidth) / 100
        }

        if (initialA !== a) {
            return convertColor({
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a
            })
        }
    }
    return convertColor(hsl);
}
