<template>
  <Swatch :class="['swatch',color==='#FFFFFF'?'color-fff':'']" :color="color" @click="onClick">
    <div :class="['dot',active?'active':'',color==='#FFFFFF'?'transparent':'',color==='transparent'?'':'',]"
         :style="{background:getContrastingColor(color)}"/>
  </Swatch>
</template>

<script setup lang="ts">
import Swatch from "@/common/Swatch.vue";
import {getContrastingColor} from '@/utils/color'
import {ColorInput} from "tinycolor2";

interface CompactColorPropsType {
  color: ColorInput,
  active: boolean
}

withDefaults(defineProps<CompactColorPropsType>(), {})
const emit = defineEmits(['change'])
const onClick = (color: ColorInput) => {
  emit('change', color);
}
</script>

<style scoped>
.swatch {
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
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
