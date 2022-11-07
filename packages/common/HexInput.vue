<template>
  <div>
    <div>
      <input type="text">
    </div>
    <div v-if="type==='hex'">
      <input type="text">
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";


defineProps({
  type: {
    type: String,
    required: true,
    default: 'hex'
  }
})
</script>

<style scoped>

</style>
