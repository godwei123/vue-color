<template>
  <div class="swatches-group" :style="{flexDirection:direction==='horizontal'?'row':'column'}">
    <SwatchesColor
        v-for="(c,index) in colors"
        :key="index"
        :active="colorEquals(color,c)"
        :color="c"
        :direction='direction'
        @change="change"
    />
  </div>
</template>

<script setup lang="ts">
import {ColorInput} from "tinycolor2";
import SwatchesColor from "@/components/swatches/SwatchesColor.vue";
import {ColorObject, Direction} from "@/interface";
import {colorEquals} from "@/utils/color";

interface SwatchesGroupPropsType {
  colors: Array<ColorInput>
  color: ColorObject,
  direction: Direction
}

withDefaults(defineProps<SwatchesGroupPropsType>(), {})
const emit = defineEmits(['change'])

const change = (color: ColorInput) => {
  emit('change', color)
}
</script>

<style scoped>
.swatches-group {
  display: flex;
}
</style>
