import {ColorFormats} from "tinycolor2";
import {convertColor} from "./color";
import {ColorObject} from "../interface";

export const calculateChange = (e: any, hsl: ColorFormats.HSLA, container: HTMLElement): ColorObject => {
    const {width: containerWidth, height: containerHeight} = container.getBoundingClientRect()
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
    const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
    let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
    let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

    if (left < 0) {
        left = 0
    } else if (left > containerWidth) {
        left = containerWidth
    }

    if (top < 0) {
        top = 0
    } else if (top > containerHeight) {
        top = containerHeight
    }

    const saturation = left / containerWidth
    const bright = 1 - (top / containerHeight)
    
    return convertColor({
        h: hsl.h,
        s: saturation,
        v: bright,
        a: hsl.a,
    })
}
