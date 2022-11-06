<template>
<div class="grid" :style="styles"></div>
</template>

<script setup lang="ts">
import { defineProps, computed} from "vue";
import * as checkboard from "../helpers/checkboard.js"

const props = defineProps({
  size:{type:Number,default:8},
  white: {type:String,default:'#fff'},
  grey: {type:String,default:'rgba(0,0,0,.08)'},
})
const styles = computed(()=>{
  return {
    background:`url(${ checkboard.get(props.white, props.grey, props.size) }) center left`
  }
})
</script>

<style scoped>
.grid{
  border-radius: 6px 6px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
