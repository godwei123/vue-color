<template>
  <div
      :style="{width:`${width}px`,height:`${height}px`}"
      class="picker alpha-picker">
    <Alpha
        radius="4px"
        :color="color"
        :direction="direction"
        @change="change"
    >
      <AlphaPointer :direction="direction" :color="color"/>
    </Alpha>
  </div>
</template>

<script setup lang="ts">
import Alpha from "../../common/Alpha.vue"
import AlphaPointer from "./AlphaPointer.vue"
import {ColorInput} from "tinycolor2";
import {convertColor, formatColor} from "../../utils/color";
import {computed, ComputedRef} from "vue";
import {ColorFormat, ColorObject, Direction, Size} from "../../interface";

interface AlphaPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  direction?: Direction,
  width?: number,
  height?: number,
  size?: Size
}

const props = withDefaults(defineProps<AlphaPropsType>(), {
  width: 361,
  height: 16,
  direction: 'horizontal',
  format: 'rgb',
  size: 'default'
})

const emit = defineEmits(["update:modelValue"])

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format))
}
</script>

<style scoped>
.alpha-picker {
  position: relative;
}
</style>
