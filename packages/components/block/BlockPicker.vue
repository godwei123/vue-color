<template>
  <div class="card block-picker" :style="{width:width}">
    <div v-if="triangle==='top'" class="triangle"
         :style="{borderColor:`transparent transparent ${modelValue} transparent`}"></div>
    <div class="head" :style="{background:modelValue}">
      <Checkboard v-if="disableAlpha"/>
      <div class="label" :style="{color:color.getContrastingColor(modelValue)}">
        {{ modelValue }}
      </div>
    </div>
    <div class="body">
      <BlockSwatches :colors="colors" @change="handleChange" @swatchHover="onSwatchHover"/>
      <EditableInput v-model="modelValue"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from "vue";
import EditableInput from "../../common/EditableInput.vue"
import BlockSwatches from "./BlockSwatches.vue"
import Checkboard from "../../common/Checkboard.vue"
import * as color from "../../utils/color.js"

const props = defineProps({
  width: {
    type: String,
    default: '170px'
  },
  colors: {
    type: Array,
    default: ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555',
      '#dce775', '#ff8a65', '#ba68c8']
  },
  triangle: {
    type: String,
    default: 'top'
  },
  modelValue: {},
  disableAlpha: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])


const handleChange = (color) => {
  emit('update:modelValue', color)
}

const onSwatchHover = () => {

}
</script>

<style scoped>
.card {
  background: #fff;
  box-shadow: 0 1px rgba(0, 0, 0, .1);
  border-radius: 6px;
  position: relative;
  height: fit-content;
}

.head {
  height: 110px;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.body {
  padding: 10px;
}

.label {
  font-size: 18px;
  position: relative;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  position: absolute;
  top: -10px;
  left: 50%;
  margin-left: -10px;
}
</style>
