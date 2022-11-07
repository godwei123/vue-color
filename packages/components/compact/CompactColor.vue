<template>
  <Swatch :class="['swatch',color==='#FFFFFF'?'color-fff':'']" :color="color" @click="onClick">
    <div :class="['dot',active?'active':'',color==='#FFFFFF'?'transparent':'',color==='transparent'?'':'',]"
         :style="{background:colorUtils.getContrastingColor(color)}"/>
  </Swatch>
</template>

<script setup lang="ts">

import Swatch from "../../common/Swatch.vue";
import * as colorUtils from '../../utils/color.js'

defineProps(['color', 'active'])
const emit = defineEmits(['click'])
const onClick = (color) => {
  emit('click', color);
}
</script>

<style scoped>
.swatch {
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}

.dot {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  border-radius: 50%;
}

.active {
  opacity: 1;
}

.color-fff {
  box-shadow: inset 0 0 0 1px #ddd;
}

.transparent {
  background: #000;
}
</style>
