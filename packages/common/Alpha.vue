<template>
  <div class="alpha">
    <div class="checkerboard">
      <Checkboard/>
    </div>
    <div class="gradient"/>
    <div
        class="container"
        :ref="container"
        @mousedown="handleMouseDown"
        @touchMove="handleChange"
        @touchStart="handleChange"
    >
      <div class="pointer">
        <!--        <slot></slot>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import * as alpha from "../utils/alpha.ts"
import Checkboard from "../common/Checkboard.vue"

const props = defineProps(['hsl', 'direction', 'a'])
const emit = defineEmits(['change'])
const container = ref<HTMLElement>(null)
const handleChange = (e) => {
  const change = alpha.calculateChange(e, props.hsl, props.direction, props.a, container.value)
  change && emit('change', e)
}

onUnmounted(() => {
  unbindEventListeners()
})
const handleMouseDown = (e) => {
  handleChange(e)
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

</style>
