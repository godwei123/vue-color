<template>
  <div class="card-color">
    <CardColor v-for="c in colors" :key="c" :color="c" @change="change"/>
  </div>
</template>

<script setup lang="ts">
import {ColorInput} from "tinycolor2";
import {ColorObject} from "@/interface";
import CardColor from "@/components/card/CardColor.vue";

interface ColorGroupPropsType {
  colors: Array<ColorInput>,
  color: ColorObject
}

const props = withDefaults(defineProps<ColorGroupPropsType>(), {})
const emit = defineEmits(['change'])


const change = (color: ColorInput) => {
  emit('change', color)
}
</script>

<style scoped>
.card-color {
  display: flex;
  flex-direction: column;
}
</style>
