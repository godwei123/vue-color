<template>
  <div class="picker card-picker" :style="{width:width,height:height}">
    <div class="card-group">
      <CardGroup
          v-for="(item,index) in colors"
          :key="index"
          :colors="item"
          :color="color"
          @change="change"
      ></CardGroup>
    </div>
  </div>
</template>

<script setup lang="ts">

import CardGroup from './CardGroup.vue'
import {ColorInput} from "tinycolor2";
import {computed, ComputedRef} from "vue";
import {ColorFormat, ColorObject} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";
import {darkColors} from "@/assets/colors";

interface CardPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  colors?: Array<Array<ColorInput>>,
  width?: string
  height?: string
}


const props = withDefaults(defineProps<CardPropsType>(), {
  format: 'rgb',
  width: '600px',
  height: '480px',
  colors: () => darkColors
})
const emit = defineEmits(["update:modelValue"])


const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}

</script>


<style scoped>
.card-picker {
  height: fit-content;
  box-sizing: border-box;
  overflow-y: scroll;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
}
</style>
