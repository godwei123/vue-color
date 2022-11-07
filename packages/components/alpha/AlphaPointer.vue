<template>
  <div class="alpha-pointer" :style="styles"></div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  direction: {type: String, default: 'horizontal'},
  color: {type: Object},
})


const styles = computed(() => {
  if (props.direction !== 'horizontal') {
    return {
      transform: 'translate(-3px, -9px)',
      top: `${props?.color?.rgb.a * 100}%`
    }
  } else {
    return {
      left: `${props?.color?.rgb.a * 100}%`

    }
  }
})

</script>

<style scoped>
.alpha-pointer {
  cursor: pointer;
  user-select: none;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transform: translate(-9px, -1px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
</style>
