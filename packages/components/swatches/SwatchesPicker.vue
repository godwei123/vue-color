<template>
  <div class="picker swatches-picker">
    <Raised>
      <SwatchesGroup v-for="color in colors" :key="color"/>
    </Raised>
  </div>
</template>

<script setup lang="ts">

import Raised from "../../common/Raised.vue";
import SwatchesGroup from "./SwatchesGroup.vue";
import {ref} from "vue";

defineProps({
  colors: {
    type: Array,
    default: [[]]
  }
})
</script>

<style scoped>

</style>
