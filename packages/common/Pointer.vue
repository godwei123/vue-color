<template>
  <div class="pointer" :style="styles"></div>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";

interface PointerPropsType {
  styles?: CSSProperties
}

const props = withDefaults(defineProps<PointerPropsType>(), {
  styles: () => ({})
})

</script>

<style scoped>
.pointer {
  cursor: pointer;
  user-select: none;
  position: absolute;
  border-radius: 50%;
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
  transition-timing-function: linear;
  transition-duration: 100ms;
}
</style>
