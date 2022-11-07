import {ref, onMounted, onUnmounted} from "vue";

export default function () {
    const x = ref(0);
    const y = ref(0);
    const clickHandler = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    onMounted(() => {
        window.addEventListener("click", clickHandler);
    });
    onUnmounted(() => {
        window.addEventListener("click", clickHandler);
    });

    return {x, y};
}
