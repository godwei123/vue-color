<template>
  <div class="circle-swatch" :style="swatchStyle">
    <Swatch :style="styles" @click="onClick" :color="color"/>
  </div>
</template>

<script setup lang="ts">
import Swatch from "@/common/Swatch.vue";
import {computed} from "vue";
import {ColorInput} from "tinycolor2";

interface CircleSwatchPropsType {
  circleSize: number,
  color: ColorInput,
  active: boolean,
}

const props = defineProps<CircleSwatchPropsType>()
const emit = defineEmits(['click'])

const swatchStyle = computed(() => {
  return {
    width: `${props.circleSize}px`,
    height: `${props.circleSize}px`,
    transform: 'scale(1)',
    transition: '100ms transform ease',
  }
})
const styles = computed(() => {
  return {
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: !props.active ?
        `inset 0 0 0 ${(props.circleSize / 2) + 1}px ${props.color}` :
        `inset 0 0 0 3px ${props.color}, 0 0 5px ${props.color}`
  }
})
const onClick = (color: ColorInput) => {
  emit('click', color)
}
</script>

<style scoped>
.circle-swatch {
  border-radius: 50%;
  background: transparent;
  transition: 100ms box-shadow ease;
  overflow: hidden;
}

.circle-swatch:hover {
  transform: scale(1.2)
}
</style>
