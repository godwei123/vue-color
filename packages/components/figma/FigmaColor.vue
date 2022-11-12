<template>
  <div class="figma-colors">
    <Swatch
        v-for="(item,index) in presetColors"
        :key="index"
        :color="item"
        class="figma-swatch"
        @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">

import {ColorInput} from "tinycolor2";
import Swatch from "@/common/Swatch.vue";

interface figmaColorPropsType {
  presetColors: Array<ColorInput>
}

const props = withDefaults(defineProps<figmaColorPropsType>(), {})
const emit = defineEmits(['change'])
const onClick = (color: ColorInput) => {
  emit('change', color)
}

</script>

<style scoped>
.figma-colors {
  display: grid;
  grid-template-columns: repeat(auto-fill, 16px);
  gap: 8px;
  justify-content: space-between;
}

.figma-swatch {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, .1);
  overflow: hidden;
}
</style>
