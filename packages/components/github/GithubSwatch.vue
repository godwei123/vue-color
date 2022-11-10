<template>
  <div class="github-swatch" :style="{width: width,height: width}">
    <Swatch :color="color" @click="onClick" :focus-style="focusStyle"/>
  </div>
</template>

<script setup lang="ts">
import Swatch from "@/common/Swatch.vue";
import {ColorInput} from "tinycolor2";
import {CSSProperties} from "vue";

const props = withDefaults(defineProps<{ color: ColorInput, width?: string, focusStyle?: CSSProperties }>(), {
  focusStyle: () => ({
    position: "relative",
    zIndex: 2,
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.25)'
  })
})


const emit = defineEmits(['change'])
const onClick = (color: ColorInput) => {
  emit('change', color)
}
</script>

<style scoped>
.github-swatch {
  font-size: 0;
}

.github-swatch:hover {
  position: relative;
  z-index: 2;
  outline: 2px solid #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.25);
}
</style>
