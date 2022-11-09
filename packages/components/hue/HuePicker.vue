<template>
  <div
      class="picker hue-picker"
      :style="{width:styles.width,height:styles.height}">
    <Hue
        :radius="styles.radius"
        :color="color"
        :direction="direction"
        @change="change"
    >
      <Pointer :styles="styles.pointer"></Pointer>
    </Hue>
  </div>
</template>

<script setup lang="ts">
import {ColorInput} from "tinycolor2";
import {computed, ComputedRef} from "vue";
import {ColorFormat, ColorObject, Direction} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";
import Pointer from "@/common/Pointer.vue";
import Hue from "@/common/Hue.vue"

interface HuePropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  direction?: Direction,
  width?: string,
  height?: string,
  round?: boolean | string
}

const props = withDefaults(defineProps<HuePropsType>(), {
  direction: 'horizontal',
  format: 'rgb',
  width: '316px',
  height: '16px',
  round: false
})
const emit = defineEmits(['update:modelValue'])

const styles = computed(() => {
  let size = parseInt(props.height)
  let radius = "", pointer = {}

  let width = size + 2;
  let height = size + 2;
  if (props.direction == 'vertical') {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-3px, ${-width / 2}px)`,
      top: `${-((color.value.hsl.h * 100) / 360) + 100}%`,
      transition: 'top linear .1s'
    }
  } else {
    pointer = {
      width: `${width}px`,
      height: `${height}px`,
      transform: ` translate(${-width / 2}px, -1px)`,
      left: `${(color.value.hsl.h * 100) / 360}%`,
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
.hue-picker {
  position: relative;
}
</style>
