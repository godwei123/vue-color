<template>
  <div style="position: relative">
    <Checkboard class="swatch-checkboard"></Checkboard>
    <div class="swatch" :style="styles" @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkboard from './Checkboard.vue'
import {computed} from "vue";
import {ColorInput} from "tinycolor2";

interface SwatchPropsType {
  color: ColorInput
}

const props = defineProps<SwatchPropsType>()
const emits = defineEmits(['click'])
const handleClick = (e: Event) => emits('click', props.color, e)
const styles = computed(() => {
  return {
    background: props.color
  }
})
</script>

<style scoped>
.swatch {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  outline: none;
}

.swatch-checkboard {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
