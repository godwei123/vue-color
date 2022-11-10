<template>
  <div class="picker block-picker" :style="{width:styles.width}">
    <div v-if="placement==='top'" class="triangle" :style="{borderColor:styles.borderColor}"></div>
    <div style="position: relative;overflow: hidden">
      <Checkboard v-if="alpha" style="border-radius: 6px 6px 0 0"/>
      <div class="head" :style="styles.head">
        <div class="label" :style="{color:styles.contrastingColor}">
          {{ color.hexString.toUpperCase() }}
        </div>
      </div>
    </div>
    <div class="body">
      <BlockSwatches :colors="colors" @change="change"/>
      <edit-input :styles="inputStyles" :value="color.hexString" @change="change"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ComputedRef, computed, CSSProperties} from "vue";
import BlockSwatches from "./BlockSwatches.vue"
import Checkboard from "@/common/Checkboard.vue"
import {ColorFormat, ColorObject, Size} from "@/interface";
import {ColorInput} from "tinycolor2";
import {convertColor, formatColor, getContrastingColor} from "@/utils/color";
import EditInput from "@/common/EditInput.vue";

interface BlockPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  placement?: 'hide' | 'top',
  alpha?: boolean,
  width?: string
}

const props = withDefaults(defineProps<BlockPropsType>(), {
  colors: () => ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555',
    '#dce775', '#ff8a65', '#ba68c8'],
  placement: 'top',
  format: 'rgb',
  alpha: false,
  width: "190px"
})

const styles = computed(() => {
  let size = parseInt(props.width)
  return {
    width: props.width ? props.width : size,
    borderColor: `transparent transparent ${color.value.hexString} transparent`,
    contrastingColor: `${getContrastingColor(color.value)}`,
    head: {background: color.value.hexString}
  }

})

const inputStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    input: {
      width: '100%',
      fontSize: '16px',
      color: '#666',
      border: '0px',
      outline: 'none',
      height: '24px',
      boxShadow: 'inset 0 0 0 1px #ddd',
      borderRadius: '4px',
      padding: '0 8px',
      boxSizing: 'border-box',
      "font-family": 'inherit'
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject | string) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}

</script>

<style scoped>
.picker {
  background: #fff;
  box-shadow: 0 1px rgba(0, 0, 0, .1);
  border-radius: 6px;
  position: relative;
  height: fit-content;
}

.head {
  padding: 17%;
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
