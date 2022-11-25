<template>
  <div
      :style="{width:styles.width,height:styles.height}"
      class="picker alpha-picker">
    <Alpha
        :radius="styles.radius"
        :direction="direction"
        :color="color"
        @change="change"
    >
      <Pointer :styles="styles.pointer"/>
    </Alpha>
  </div>
</template>

<script setup lang="ts">

import {computed, ComputedRef} from "vue";
import {ColorInput} from "tinycolor2";
import Alpha from "@/common/Alpha.vue"
import Pointer from "@/common/Pointer.vue";
import {ColorFormat, ColorObject, Direction, Size} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: "AlphaPicker"
})

interface AlphaPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  direction?: Direction,
  width?: string,
  height?: string
  round?: boolean | string
}

const props = withDefaults(defineProps<AlphaPropsType>(), {
  direction: 'horizontal',
  format: 'rgb',
  round: false,
  width: '316px',
  height: '16px'
})

const emit = defineEmits(["update:modelValue"])

const styles = computed(() => {
  let size = parseInt(props.height)
  let width = size + 2;
  let height = size + 2;
  let radius = "", pointer = {}
  if (props.direction == 'vertical') {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-4px, ${-width / 2}px)`,
      top: `${color.value.rgb.a * 100}%`,
      transition: 'top linear .1s'
    }
  } else {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: ` translate(${-width / 2}px, -1px)`,
      left: `${color.value.rgb.a * 100}%`,
      transition: "left linear .1s"
    }
  }
  if (typeof props.round === 'boolean') {
    radius = props.round ? `${size / 2}px` : '0'
  } else {
    radius = props.round
  }
  return {
    width: props.direction == 'horizontal' ? props.width : props.height,
    height: props.direction == 'vertical' ? props.width : props.height,
    pointer,
    radius
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
.alpha-picker {
  position: relative;
  width: 100%;
}
</style>
