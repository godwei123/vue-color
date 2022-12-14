<template>
  <div class="position-absolute" :style="{borderRadius:radius}">
    <div
        :class="['hue-container',`hue-${direction}`]"
        ref="container"
        :style="{borderRadius:radius}"
        @mousedown="handleMouseDown"
        @onTouchMove="handleChange"
        @onTouchStart="handleChange">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {calculateChange} from "../utils/hue";
import {ColorObject, Direction} from "../interface";

interface Hue {
  direction?: Direction,
  color: ColorObject,
  radius?: string
}

const props = withDefaults(defineProps<Hue>(), {
  direction: 'horizontal',
  radius: '0px',
})

const emit = defineEmits(['change'])

const container = ref()

const handleMouseUp = () => {
  unbindEventListeners()
}
const handleMouseDown = (e: Event) => {
  handleChange(e)
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

const handleChange = (e: Event) => {
  const change = calculateChange(e, props.direction, props.color.hsl, container.value)
  emit("change", change)
}

onUnmounted(() => {
  unbindEventListeners()
})
</script>

<style scoped>

.hue-container {
  padding: 0 2px;
  position: relative;
  height: 100%;
}

.hue-horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

.hue-vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
  #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
</style>
