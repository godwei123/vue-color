<template>
  <div
      :style="{width:`${width}px`,height:`${height}px`,position:'relative'}"
      :class="['alpha-picker',className]">
    <Alpha
        :style="{radius:'2px',...style}"
        :rgb="rgb"
        :hsl="hsl"
        :direction="direction"
        @change="change"
    >
      <AlphaPointer/>
    </Alpha>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Alpha from "../../common/Alpha.vue"
import AlphaPointer from "./AlphaPointer.vue"

defineProps({
  width:{type:Number, default:361},
  height:{type:Number, default:16},
  direction:{type:String, default:'horizontal'},
  className:{type:String},
  style:{type:Object},
  rgb:{type:String},
  hsl:{type:String},
  modelValue:{}
})
const emit = defineEmits(["update:modelValue"])
const change = (data) => {
  emit("update:modelValue",data)
}
</script>

<style scoped>

</style>
