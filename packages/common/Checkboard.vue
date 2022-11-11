<template>
  <div class="position-absolute" :style="styles"></div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {get} from "@/utils/checkboard"

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

</style>
