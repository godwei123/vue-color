<template>
  <div class="picker github-picker"
       :style="{width:styles.width}">
    <div class="triangle-shadow" :style="styles.triangleShadow"></div>
    <div class="triangle" :style="styles.triangle"></div>
    <div class="github-swatches">
      <GithubSwatch
          :width="subWidth"
          v-for="color in colors"
          :key="color"
          :color="color"
          @change="change"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef, CSSProperties, ref} from "vue";
import GithubSwatch from "./GithubSwatch.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";


interface GithubPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  width?: string,
  subWidth?: string
  colors?: Array<ColorInput>,
  placement?: "hide" | "top-start" | "top-end"
}

const props = withDefaults(defineProps<GithubPropsType>(), {
  width: '200px',
  colors: () => ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76',
    '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3',
    '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
  format: 'rgb',
  placement: 'top-start',
  subWidth: '30px'
})
const emit = defineEmits(["update:modelValue"])


const styles = computed(() => {
  let triangleShadow: CSSProperties = {}, triangle: CSSProperties = {}
  if (props.placement === 'hide') {
    triangle = {display: 'none'}
    triangleShadow = {display: 'none'}
  }
  if (props.placement.includes('top')) {
    triangle = {...triangle, top: '-14px'}
    triangleShadow = {...triangleShadow, top: '-16px'}
  }
  if (props.placement.includes('start')) {
    triangle = {...triangle, left: '10px'}
    triangleShadow = {...triangleShadow, left: '9px'}
  }
  if (props.placement.includes('end')) {
    triangle = {...triangle, right: '10px'}
    triangleShadow = {...triangleShadow, right: '9px'}
  }
  return {
    width: `${Math.floor((parseInt(props.width) - 20) / parseInt(props.subWidth)) * parseInt(props.subWidth) + 20}px`,
    triangleShadow,
    triangle
  }
})

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.github-picker {
  background: #ffffff;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .15);
  border-radius: 4px;
  position: relative;
  padding: 10px;
  height: fit-content;
  box-sizing: border-box;
}

.triangle {
  position: absolute;
  border: 7px solid transparent;
  border-bottom-color: #ffffff;
}

.triangle-shadow {
  position: absolute;
  border: 8px solid transparent;
  border-bottom-color: rgba(0, 0, 0, .15);
}

.github-swatches {
  display: flex;
  flex-wrap: wrap;
}

</style>
