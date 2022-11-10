<template>
  <div class="picker swatches-picker">
    <Raised>
      <SwatchesGroup v-for="color in colors" :key="color"/>
    </Raised>
  </div>
</template>

<script setup lang="ts">
import Raised from "@/common/Raised.vue";
import SwatchesGroup from "./SwatchesGroup.vue";
import {ColorInput} from "tinycolor2";

interface SwatchesPropsType {
  colors: Array<Array<ColorInput>>
}

const props = withDefaults(defineProps<SwatchesPropsType>(), {})

</script>

<style scoped>

</style>
