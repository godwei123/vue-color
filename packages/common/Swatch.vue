<template>
<div class="swatch" :style="styles" @click="handleClick" @keydown="handleKeyDown">
  <slot></slot>
<!--  <Checkboard style="box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);"></Checkboard>-->
</div>
</template>

<script setup lang="ts">
import Checkboard from  './Checkboard.vue'
import {computed} from "vue";
const props = defineProps(['color'])
const emits = defineEmits(['click'])
const handleClick = e => emits('click',props.color, e)
const handleKeyDown = e => e.keyCode === 13 && emits('click',props.color, e)
const styles = computed(()=>{
  return {
    background:props.color
  }
})
</script>

<style scoped>
.swatch{
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  outline: none;
}
</style>
