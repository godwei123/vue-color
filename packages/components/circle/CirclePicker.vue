<template>
  <div class="picker circle-picker" :style="styles">
    <CircleSwatch
        class="circle-swatch"
        v-for="(item,index) in colors"
        :key="index"
        :color="item"
        :active="colorEquals(color,item)"
        :circle-size="circleSize"
        @click="change"/>

  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import CircleSwatch from "./CircleSwatch.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject} from "@/interface";
import {convertColor, formatColor, colorEquals} from "@/utils/color";

interface CirclePropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  width?: string,
  circleSize?: number,
}

const props = withDefaults(defineProps<CirclePropsType>(), {
  width: "252px",
  format: 'rgb',
  circleSize: 28,
  colors: () => ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
})

const emit = defineEmits(['update:modelValue'])

const styles = computed(() => {
  return {
    width: props.width,
    "grid-template-columns": `repeat(auto-fill,${props.circleSize}px)`,
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
