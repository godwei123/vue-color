import {ref} from "vue";

export function useThrottle(fn: Function, wait: number) {
    const timer = ref()

    const cancel = () => timer.value && clearTimeout(timer.value)

    const run = (...args: any) => {
        if (timer.value) {
            return
        }

        timer.value = setTimeout(() => {
            fn(...args)
            timer.value = null

        }, wait)
    }

    return {
        cancel,
        run
    }
}
