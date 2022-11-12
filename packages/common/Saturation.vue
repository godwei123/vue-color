<template>
  <div
      class="position-absolute"
      ref="container"
      :style="{background: `hsl(${ color.hsl.h },100%, 50%)`}"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
  >
    <div class="position-absolute saturation-white">
      <div class="position-absolute saturation-black"></div>
      <div class="pointer"
           :style="{top: `${ -(color.hsv.v * 100) + 100 }%`,left: `${ color.hsv.s * 100 }%`}">
        <div class="pointer-circle" :style="{background: color.hexString}"></div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {ColorObject} from "../interface";
import {throttle} from "lodash";
import {calculateChange} from "../utils/saturation";

interface SaturationPropsType {
  color: ColorObject
}

const props = withDefaults(defineProps<SaturationPropsType>(), {})
const emit = defineEmits(['click'])
const container = ref()

const handleMouseDown = (e: Event) => {
  handleChange(e)
  const renderWindow = getContainerRenderWindow()

  renderWindow.addEventListener('mousemove', handleChange)
  renderWindow.addEventListener('mouseup', handleMouseUp)
}

const handleChange = (e: Event) => {
  throttle(() => {
        emit('click', calculateChange(e, props.color.hsl, container.value))
      }, 100
  )()
}
const getContainerRenderWindow = () => {
  let renderWindow: any = window
  while (!renderWindow.document.contains(container.value) && renderWindow.parent !== renderWindow) {
    renderWindow = renderWindow.parent
  }
  return renderWindow
}
const handleMouseUp = () => {
  unbindEventListeners()
}

const unbindEventListeners = () => {
  const renderWindow = getContainerRenderWindow()
  renderWindow.removeEventListener('mousemove', handleChange)
  renderWindow.removeEventListener('mouseup', handleMouseUp)
}

onUnmounted(() => {
  unbindEventListeners()
})
</script>

<style scoped>


.saturation-white {
  background: -webkit-linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

.saturation-black {
  background: -webkit-linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}

.pointer {
  position: absolute;
  user-select: none;
  cursor: default;
  transition: top linear 100ms, left linear 100ms;
}

.pointer-circle {
  width: 8px;
  height: 8px;
  box-shadow: 0 0 0 2px #fff;
  border-radius: 50%;
  cursor: default;
  transform: translate(-4px, -4px);

}
</style>
