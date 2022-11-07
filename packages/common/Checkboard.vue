<template>
  <div class="checker-board" :style="styles"></div>
</template>

<script setup lang="ts">
import {defineProps, computed} from "vue";
import {get} from "../utils/checkboard"

const props = defineProps({
  size: {type: Number, default: 8},
  white: {type: String, default: '#fff'},
  grey: {type: String, default: '#e6e6e6'},
})
const styles = computed(() => {
  return {
    background: `url(${get(props.white, props.grey, props.size)}) center left`
  }
})
</script>

<style scoped>
.checker-board {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
