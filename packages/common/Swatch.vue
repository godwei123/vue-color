<template>
  <div class="swatch">
    <Checkboard class="swatch-checkboard" v-if="alpha"></Checkboard>
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
  color: ColorInput,
  active?: boolean,
  alpha?: boolean
}

const props = withDefaults(defineProps<SwatchPropsType>(), {
  active: false,
  alpha: false
})
const emits = defineEmits(['click'])
const handleClick = (e: Event) => emits('click', props.color, e)
const styles = computed(() => {
  return props.active ? '' : {
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
