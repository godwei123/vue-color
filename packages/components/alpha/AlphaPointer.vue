<template>
  <div class="alpha-pointer" :style="styles"></div>
</template>

<script setup lang="ts">
import {computed, h} from "vue";
import {ColorObject, Direction} from "../../interface";

interface AlphaPointer {
  direction: Direction,
  color: ColorObject,
  size: number
}

const props = withDefaults(defineProps<AlphaPointer>(), {
  direction: "horizontal",
})

const styles = computed(() => {

  let width = props.size + 2;
  let height = props.size + 2;
  if (props.direction !== 'horizontal') {
    return {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(-4px, ${-width / 2}px)`,
      top: `${props?.color?.rgb.a * 100}%`,
      transition: 'top linear .1s'
    }
  } else {
    return {
      width: `${width}px`,
      height: `${height}px`,
      transform: ` translate(${-width / 2}px, -1px)`,
      left: `${props?.color?.rgb.a * 100}%`,
      transition: "left linear .1s"
    }
  }
})

</script>

<style scoped>
.alpha-pointer {
  cursor: pointer;
  user-select: none;
  position: absolute;
  border-radius: 50%;
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);

}
</style>
