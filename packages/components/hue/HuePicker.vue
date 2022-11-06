<template>
<div class="hue-picker">
  <Hue
      @change="handleChange"
  />
</div>
</template>

<script setup lang="ts">
import Hue from "../../common/Hue.vue"

const props = defineProps({
  width:{
    type:String || Number
  },
  modelValue:{}

})
const emit = defineEmits(['update:modelValue'])

const handleChange =(val)=>{
emit("update:modelValue",val)
}
</script>

<style scoped>

</style>
