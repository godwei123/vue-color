<template>
  <div class="sketch-colors">
    <Swatch
        v-for="(item,index) in presetColors"
        :key="index"
        :color="item"
        class="sketch-swatch"
        @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">

import {ColorInput} from "tinycolor2";
import Swatch from "@/common/Swatch.vue";

interface SketchColorPropsType {
  presetColors: Array<ColorInput>
}

const props = withDefaults(defineProps<SketchColorPropsType>(), {})
const emit = defineEmits(['change'])
const onClick = (color: ColorInput) => {
  emit('change', color)
}

</script>

<style scoped>
.sketch-colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, 16px);
  gap: 8px;
  justify-content: space-between;
}

.sketch-swatch {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .1);
  overflow: hidden;
}
</style>
