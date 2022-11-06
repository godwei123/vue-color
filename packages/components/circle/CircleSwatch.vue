<template>
  <div class="swatch" :style="swatchStyle">
    <Swatch class="swatch-item" :style="styles" :color="color" @click="onClick"/>
  </div>
</template>

<script setup lang="ts">
import Swatch from "../../common/Swatch.vue";
import {computed} from "vue";

const props = defineProps(['color','circleSize','circleSpacing','active'])
const emit = defineEmits(['click'])

const swatchStyle =computed(()=>{
  return {
    width: `${props.circleSize}px`,
    height: `${props.circleSize}px`,
    marginRight: `${props.circleSpacing}px`,
    marginBottom: `${props.circleSpacing}px`,
    transform: 'scale(1)',
    transition: '100ms transform ease',
  }
})
const styles = computed(()=>{
  return{
    background: 'transparent',
    boxShadow: !props.active ?
        `inset 0 0 0 ${ (props.circleSize / 2) + 1 }px ${ props.color }`:
        `inset 0 0 0 3px ${ props.color }, 0 0 5px ${ props.color }`
  }
})
const onClick = (color) => {
 emit('click',color)
}
</script>

<style scoped>
.swatch-item{
  border-radius: 50%;
  background: transparent;
  transition: 100ms box-shadow ease
}
.swatch:hover{
  transform: scale(1.2)
}
</style>
