<template>
<div class="card circle-picker" :style="{width:width}">
<CircleSwatch v-for="color in colors"
:key="color"
:color="color"
:active="color===modelValue"
:circle-size="circleSize"
:circle-spacing="circleSpacing"
@click="handleChange"/>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import CircleSwatch from "./CircleSwatch.vue";
defineProps({
  width:{type:String,default:"252px"},
  circleSize:{type:Number,default:32},
  circleSpacing:{type:Number,default:14},
  colors:{type:Array,default:['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
      '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']},
  modelValue:{}
})
const emit = defineEmits(['update:modelValue'])

const handleChange = (data)=>{
  emit('update:modelValue',data)
}
</script>

<style scoped>
.card{
display: flex;
flex-wrap: wrap;
}
</style>
