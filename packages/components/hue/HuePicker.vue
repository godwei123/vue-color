<template>
  <div class="picker hue-picker" :style="styles">
    <Hue
        :color="color"
        :direction="direction"
        @change="change"
    >
      <HuePointer :size="sizeEnum[size]" :direction="direction" :color="color"/>
    </Hue>
  </div>
</template>

<script setup lang="ts">
import Hue from "../../common/Hue.vue"
import HuePointer from "./HuePointer.vue"
import {ColorInput} from "tinycolor2";
import {computed, ComputedRef} from "vue";
import {ColorFormat, ColorObject, Direction, Size} from "../../interface";
import {convertColor, formatColor} from "../../utils/color";

interface HuePropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  direction?: Direction,
  width?: number,
  size?: Size,
}

const props = withDefaults(defineProps<HuePropsType>(), {
  direction: 'horizontal',
  format: 'rgb',
  size: 'default',
})
const emit = defineEmits(['update:modelValue'])

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

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.hue-picker {
  position: relative;
}
</style>
