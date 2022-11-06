<template>
  <div class="swatches">
    <Swatch v-for="color in colors"
        :key="color"
        :color="color"
        class="swatch"
        @click="onClick"
        @hover="onSwatchHover"
    />
  </div>
</template>

<script setup lang="ts">
import Swatch from '../../common/Swatch.vue'
import {ref} from "vue";
defineProps(["colors"])
const emit = defineEmits(["change","swatchHover"])

const onClick = (color,e) => {
  emit("change",color)
}

const onSwatchHover = (color,e) => {
  emit("swatchHover",e)
}
</script>

<style scoped>
.swatches{
  display: grid;
  grid-template-columns: repeat(auto-fit, 22px);
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.swatch{
  width: 22px;
  height: 22px;
  border-radius: 4px;
}
</style>
