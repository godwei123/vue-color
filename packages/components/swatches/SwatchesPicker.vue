<template>
  <Raised>
    <div class="picker swatches-picker overflow" :style="{width:styles.w,height:styles.h}">
      <div class="body">
        <SwatchesGroup :direction="direction" v-for="item in colors" :key="item+''" :colors="item" :color="color"/>
      </div>
    </div>
  </Raised>
</template>

<script setup lang="ts">
import Raised from "@/common/Raised.vue";
import SwatchesGroup from "./SwatchesGroup.vue";
import {ColorInput} from "tinycolor2";
import {computed, ComputedRef, CSSProperties} from "vue";
import {ColorFormat, ColorObject, Direction} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";

interface SwatchesPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors: Array<Array<ColorInput>>,
  width?: string
  height?: string,
  direction?: Direction
}

const props = withDefaults(defineProps<SwatchesPropsType>(), {
  width: '320px',
  height: '240px',
  format: 'rgb',
  direction: 'vertical',
  colors: () => [
    ['#FEF2ED', '#FEDDD2', '#FDB7A5', '#FB9078', '#FA664C', '#F93920', '#D52515', '#B2140C', '#8E0805', '#6A0103'],
    ['#FDECEF', '#FDECEF', '#F6A0B5', '#F27396', '#ED487B', '#E91E63', '#C51356', '#A20B48', '#7E053A', '#5A012B'],
    ['#F7E9F7', '#EFCAF0', '#DD9BE0', '#C96FD1', '#B449C2', '#9E28B3', '#871E9E', '#71168A', '#5C0F75', '#490A61'],
    ['#F3EDF9', '#E2D1F4', '#C4A7E9', '#A67FDD', '#885BD2', '#6A3AC7', '#572FB3', '#46259E', '#361C8A', '#281475'],
    ['#ECEFF8', '#D1D8F0', '#A7B3E1', '#8090D3', '#5E6FC4', '#3F51B5', '#3342A1', '#28348C', '#1F2878', '#171D63'],
    ['#EAF5FF', '#CBE7FE', '#98CDFD', '#65B2FC', '#3295FB', '#0077FA', '#0062D6', '#004FB3', '#003D8F', '#002C6B'],
    ['#EAF5FF', '#CBE7FE', '#98CDFD', '#65B2FC', '#3295FB', '#0077FA', '#0062D6', '#004FB3', '#003D8F', '#002C6B'],
    ['#EAF5FF', '#CBE7FE', '#98CDFD', '#65B2FC', '#3295FB', '#0077FA', '#0062D6', '#004FB3', '#003D8F', '#002C6B'],
    ['#EAF5FF', '#CBE7FE', '#98CDFD', '#65B2FC', '#3295FB', '#0077FA', '#0062D6', '#004FB3', '#003D8F', '#002C6B'],
  ]
})

const emit = defineEmits(['update:modelValue'])

const styles = computed(() => {
  let w = props.width, h = props.height
  return {
    w, h
  }
})

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject | string) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}


</script>

<style scoped>

.overflow {
  overflow: scroll;
}

.body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
}

</style>
