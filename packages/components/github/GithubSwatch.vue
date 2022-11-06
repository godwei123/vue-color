<template>
<div class="swatch">
  <Swatch :color="color" @click="onClick"/>
</div>
</template>

<script setup lang="ts">

import Swatch from "../../common/Swatch.vue";

defineProps(['color'])
const emit = defineEmits(['click'])
const onClick = (color,e) => {
  emit('click',color,e)
}
</script>

<style scoped>
.swatch{
  width: 30px;
  height: 30px;
  font-size: 0;
}
.swatch:hover{
  position: relative;
  z-index: 2;
  outline: 2px solid #fff;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.25);
}
</style>
