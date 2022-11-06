<template>
<div class="card github-picker" :style="{width:width}">
  <div class="triangle-shadow" :style="triangleShadowStyle"></div>
  <div class="triangle" :style="triangleStyle"></div>
  <GithubSwatch v-for="color in colors" :key="color" :color="color" @click="handleChange"/>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import GithubSwatch from "./GithubSwatch.vue";
const props = defineProps({
  width:{type:String,default:'200px'},
  colors: {type:Array,default:['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
      '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']},
  triangle:{type:String,default: 'top-left'},
  modelValue:{}
})

const triangleShadowStyle=computed(()=>{
  if (props.triangle === 'hide'){
    return {display:"none"}
  }else if (props.triangle === 'top-left'){
    return {top:'-16px',left:'9px'}
  }else if (props.triangle === 'top-right'){
    return {top:'-16px',left:'9px'}
  }else if (props.triangle === 'bottom-left'){
    return {
      top: '37px',
      left: '9px',
      transform: 'rotate(180deg)',
    }
  }else if (props.triangle === 'bottom-right'){
    return  {
      top: '37px',
      right: '9px',
      transform: 'rotate(180deg)',
    }
  }
})
const triangleStyle=computed(()=>{
  if (props.triangle === 'hide'){
    return {display:"none"}
  }else if (props.triangle === 'top-left'){
    return {top:'-14px',left:'10px'}
  }else if (props.triangle === 'top-right'){
    return {top:'-14px',left:'10px'}
  }else if (props.triangle === 'bottom-right'){
    return {
      top: '35px',
      left: '10px',
      transform: 'rotate(180deg)',
    }
  }else if (props.triangle === 'bottom-left'){
    return {
      top: '37px',
      left: '9px',
      transform: 'rotate(180deg)',
    }
  }
})
const emit = defineEmits(["update:modelValue"])

const handleChange = (color,e) => {
  emit("update:modelValue",color)
}
</script>

<style scoped>
.card{
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.2);
  box-shadow: 0 3px 12px rgba(0,0,0,.15);
  border-radius: 4px;
  position: relative;
  padding: 9px;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  box-sizing: border-box;
}
.triangle{
  position: absolute;
  border: 7px solid transparent;
  border-bottom-color: #ffffff;

}
.triangle-shadow{
  position: absolute;
  border: 8px solid transparent;
  border-bottom-color: rgba(0,0,0,.15);
}

</style>
