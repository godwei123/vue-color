<template>
  <div class="picker twitter-picker" :style="{width:styles.width}">
    <div class="triangle-shadow" :style="styles.triangleShadow"></div>
    <div class="triangle" :style="styles.triangle"></div>
    <div class="body">
      <div class="twitter-swatches">
        <div class="twitter-swatch"
             :style="{width:subWidth,height:subWidth}"
             v-for="(item,index) in colors"
             :key="index">
          <Swatch :color="item" @click="change"></Swatch>
        </div>
        <div style="display:flex;">
          <span class="hash" :style="{width:subWidth,height:subWidth}">#</span>
          <edit-input :value="color.hex" @change="change" :styles="inputStyles"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, ComputedRef, CSSProperties} from "vue";
import Swatch from "@/common/Swatch.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject, Size} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";
import EditInput from "@/common/EditInput.vue";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: 'TwitterPicker'
})

interface TwitterPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  placement?: "hide" | "top-start" | "top-end"
  width?: string,
  subWidth?: string
}

const props = withDefaults(defineProps<TwitterPropsType>(), {
  colors: () => ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
    '#ABB8C3', '#EB144C', '#F78DA7'],
  width: '276px',
  placement: 'top-start',
  format: 'rgb',
  subWidth: '30px'
})

const emit = defineEmits(['update:modelValue'])


const styles = computed(() => {
  let triangleShadow: CSSProperties = {}, triangle: CSSProperties = {}
  if (props.placement === 'hide') {
    triangle = {display: 'none'}
    triangleShadow = {display: 'none'}
  }
  if (props.placement.includes('top')) {
    triangle = {...triangle, top: '-10px'}
    triangleShadow = {...triangleShadow, top: '-11px'}
  }
  if (props.placement.includes('start')) {
    triangle = {...triangle, left: '12px'}
    triangleShadow = {...triangleShadow, left: '12px'}
  }
  if (props.placement.includes('end')) {
    triangle = {...triangle, right: '12px'}
    triangleShadow = {...triangleShadow, right: '12px'}
  }
  let w = Math.floor((parseInt(props.width) - 12) / (parseInt(props.subWidth) + 8)) * (parseInt(props.subWidth) + 8) + 12
  return {
    width: `${w}px`,
    triangleShadow,
    triangle
  }
})

const inputStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    input: {
      width: '76px',
      fontSize: '16px',
      color: '#666',
      border: '0px',
      outline: 'none',
      height: `${props.subWidth}`,
      boxShadow: 'inset 0 0 0 1px #F0F0F0',
      boxSizing: 'border-box',
      borderRadius: '0 4px 4px 0',
      float: 'left',
      paddingLeft: '8px',
      "font-family": 'inherit'
    }
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
.twitter-picker {
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  height: fit-content;
  box-sizing: border-box;
  font-family: "IBM Plex Mono", Menlo, Monaco, Consolas, "Lucida Console", monospace;
}

.body {
  padding: 10px;
}

.twitter-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 5px;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent #fff transparent;
  position: absolute
}

.triangle-shadow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent rgba(0, 0, 0, .1) transparent;
  position: absolute;
}

.twitter-swatch {
  border-radius: 4px;
  overflow: hidden;
}

.twitter-swatch:hover {
  transform: scale(1.1);
  transition: transform linear 100ms;
}

.hash {
  background: #F0F0F0;
  border-radius: 4px 0 0 4px;
  color: #98A1A4;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
