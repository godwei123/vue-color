<template>
  <div class="alpha" :style="alphaStyles">
    <div class="check-board-wrap" :style="alphaStyles">
      <Checkboard/>
    </div>
    <div class="gradient" :style="gradientStyles"/>
    <div
        class="container"
        ref="container"
        @mousedown="handleMouseDown"
        @touchMove="handleChange"
        @touchStart="handleChange"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onUnmounted, ref} from "vue";
import {calculateChange} from "../utils/alpha"
import Checkboard from "../common/Checkboard.vue"
import {useThrottle} from "../hooks/useThrottle";

const props = defineProps(['color', 'direction', 'radius', 'shadow'])
const emit = defineEmits(['change'])
const container = ref()
const handleChange = (e: Event) => {
  const change = calculateChange(e, props.color.hsl, props.direction, props.color.hsl.a, container.value)
  change && emit('change', change)
}

const {cancel, run} = useThrottle(handleChange, 300)

const alphaStyles = computed(() => {
  return {borderRadius: props.radius}
})

const gradientStyles = computed(() => {
  return {
    background: props.direction === 'vertical' ?
        `linear-gradient(to bottom, rgba(${props.color.rgb.r},${props.color.rgb.g},${props.color.rgb.b}, 0) 0%,
           rgba(${props.color.rgb.r},${props.color.rgb.g},${props.color.rgb.b}, 1) 100%)` :
        `linear-gradient(to right, rgba(${props.color.rgb.r},${props.color.rgb.g},${props.color.rgb.b}, 0) 0%,
           rgba(${props.color.rgb.r},${props.color.rgb.g},${props.color.rgb.b}, 1) 100%)`,
    boxShadow: props.shadow,
    borderRadius: props.radius,
  }
})


onUnmounted(() => {
  unbindEventListeners()
})
const handleMouseDown = (e: Event) => {
  run(e)
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}
const handleMouseUp = () => {
  unbindEventListeners()
}
const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}
</script>

<style scoped>
.alpha, .gradient {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.check-board-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.container {
  position: relative;
  height: 100%;
  margin: 0 3px;
}

.pointer {
  position: absolute;
}

.slider {
  width: 4px;
  border-radius: 1px;
  height: 8px;
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
}
</style>
