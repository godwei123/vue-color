<template>
  <div
      :style="styles.alphaWrap"
      class="picker alpha-picker">
    <Alpha
        :radius="radius"
        :direction="direction"
        :color="color"
        @change="change"
    >
      <Pointer :styles="styles.pointer"/>
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
import Pointer from "../../common/Pointer.vue";

interface AlphaPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  direction?: Direction,
  width?: string,
  size?: Size,
  round?: boolean
}

const props = withDefaults(defineProps<AlphaPropsType>(), {
  direction: 'horizontal',
  format: 'rgb',
  size: 'default',
  round: false,
  width: '250px'
})
const sizeEnum = {
  'mini': 10,
  'small': 14,
  'default': 16,
  'middle': 18,
  'large': 20,
}
const styles = computed(() => {
  let size = sizeEnum[props.size]
  let width = size + 2;
  let height = size + 2;
  let alphaWrap = {}, pointer = {}
  if (props.direction == 'vertical') {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-4px, ${-width / 2}px)`,
      top: `${color.value.rgb.a * 100}%`,
      transition: 'top linear .1s'
    }
    alphaWrap = {
      height: props.width ? props.width : '100%',
      width: `${size}px`
    }
  } else {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: ` translate(${-width / 2}px, -1px)`,
      left: `${color.value.rgb.a * 100}%`,
      transition: "left linear .1s"
    }

    alphaWrap = {
      width: props.width ? props.width : '100%',
      height: `${size}px`
    }
  }
  return {
    alphaWrap,
    pointer
  }
})

const emit = defineEmits(["update:modelValue"])

const radius = computed(() => {
  return props.round ? `${sizeEnum[props.size] / 2}px` : "4px"
})

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
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
