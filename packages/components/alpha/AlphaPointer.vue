<template>
<div class="picker" :style="{...style}"></div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  direction:{type:String, default:'horizontal'},
})

const style = computed(()=>{
  if (props.direction === 'horizontal') {
    return { transform: 'translate(-3px, -9px)'}
  }
  return ''
})

</script>

<style scoped>
.picker{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transform: translate(-9px, -1px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
</style>
