<template>
<div class="hue">
  <div
      class="hue-horizontal"
      @mousedown="handleMouseDown"
       @onTouchMove="handleChange"
       @onTouchStart="handleChange">
    <div class="pointer">
      <div class="slider"></div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {onUnmounted} from "vue";
import * as hue from "../helpers/hue.ts";

defineProps({
  direction:{},
  hsl:{},
  container:{},
})

const emit =defineEmits(['change'])

const handleMouseUp = () => {
  unbindEventListeners()
}
const handleMouseDown = (e) => {
  handleChange(e)
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

const handleChange = (e) => {
  const change = hue.calculateChange(e, props.direction, props.hsl, container)
  change && emit("change", e)

}
onUnmounted(()=>{
  unbindEventListeners()
})
</script>

<style scoped>
.hue-horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
  33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  background: -webkit-linear-gradient(to right, #f00 0%, #ff0
  17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

.hue-vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
  #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
  #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}

.slider{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transform: translate(-9px, -1px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}

</style>
