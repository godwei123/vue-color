<template>
  <div
      :style="styles"
      class="picker alpha-picker">
    <Alpha
        :radius="radius"
        :color="color"
        :direction="direction"
        @change="change"
    >
      <AlphaPointer :size="sizeEnum[size]" :direction="direction" :color="color"/>
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
  size?: Size,
  round?: boolean
}

const props = withDefaults(defineProps<AlphaPropsType>(), {
  direction: 'horizontal',
  format: 'rgb',
  size: 'default',
  round: false
})
const sizeEnum = {
  'mini': 10,
  'small': 14,
  'default': 16,
  'middle': 18,
  'large': 20,
}
const styles = computed(() => {
  return props.direction === 'horizontal' ?
      {
        width: props.width ? `${props.width}px` : '100%',
        height: `${sizeEnum[props.size]}px`
      } :
      {
        height: props.width ? `${props.width}px` : '100%',
        width: `${sizeEnum[props.size]}px`
      }
})

const emit = defineEmits(["update:modelValue"])

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const radius = computed(() => {
  return props.round ? `${sizeEnum[props.size] / 2}px` : "4px"
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.alpha-picker {
  position: relative;
  width: 100%;
}
</style>
