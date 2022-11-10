<template>
  <div class="picker circle-picker" :style="styles">
    <CircleSwatch
        class="circle-swatch"
        v-for="item in colors"
        :key="item"
        :color="item"
        :active="colorEquals(color,item)"
        :circle-size="size"
        :circle-spacing="circleSpacing"
        @click="change"/>

  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import CircleSwatch from "./CircleSwatch.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject, Size} from "@/interface";
import {convertColor, formatColor, colorEquals} from "@/utils/color";

interface CirclePropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  width?: string,
  circleSize?: "mini" | "small" | "default" | "middle" | "large" | number,
  circleSpacing?: number,
}

const props = withDefaults(defineProps<CirclePropsType>(), {
  width: "256px",
  format: 'rgb',
  circleSize: "default",
  circleSpacing: 14,
  colors: () => ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
    '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
})

const emit = defineEmits(['update:modelValue'])
const sizeEnum = {
  "mini": 20,
  "small": 24,
  "default": 28,
  "middle": 30,
  "large": 32
}
const size = computed(() => {
  if (typeof props.circleSize === 'string') {
    return sizeEnum[props.circleSize as Size]
  }
  return props.circleSize
})

const styles = computed(() => {
  return {
    width: props.width,
    "grid-template-columns": `repeat(auto-fill,${size.value}px)`,
  }
})

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject | string) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.circle-picker {
  display: grid;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
