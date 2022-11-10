<template>
  <div class="block-swatches">
    <Swatch v-for="color in colors"
            :key="color"
            :color="color"
            class="block-swatch"
            @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
import Swatch from '@/common/Swatch.vue'
import {ColorInput} from "tinycolor2";

interface BlockSwatchesPropsType {
  colors: Array<ColorInput>
}

const props = withDefaults(defineProps<BlockSwatchesPropsType>(), {})
const emit = defineEmits(["change"])

const onClick = (color: ColorInput) => {
  emit("change", color)
}

</script>

<style scoped>
.block-swatches {
  display: grid;
  grid-template-columns: repeat(auto-fit, 24px);
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 8px;
}

.block-swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;
}
</style>
