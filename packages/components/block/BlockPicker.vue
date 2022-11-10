<template>
  <div class="picker block-picker" :style="{width:styles.width}">
    <div v-if="triangle==='top'" class="triangle" :style="{borderColor:styles.borderColor}"></div>
    <div style="position: relative">
      <Checkboard v-if="alpha" style="border-radius: 6px 6px 0 0"/>
      <div class="head" :style="{background:color.origin}">
        <div class="label" :style="{color:styles.contrastingColor}">
          {{ color.hexString }}
        </div>
      </div>
    </div>
    <div class="body">
      <BlockSwatches :colors="colors" @change="change"/>
      <EditableInput radius="4px" style="height: 24px;" :color="color.hexString" @change="change"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ComputedRef, computed} from "vue";
import EditableInput from "@/common/EditableInput.vue"
import BlockSwatches from "./BlockSwatches.vue"
import Checkboard from "@/common/Checkboard.vue"
import {ColorFormat, ColorObject, Size} from "@/interface";
import {ColorInput} from "tinycolor2";
import {convertColor, formatColor, getContrastingColor} from "@/utils/color";

interface BlockPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  triangle?: string,
  alpha?: boolean,
  size: Size | 'full',
  width?: string
}

const props = withDefaults(defineProps<BlockPropsType>(), {
  colors: () => ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555',
    '#dce775', '#ff8a65', '#ba68c8'],
  triangle: 'top',
  format: 'rgb',
  size: 'default',
  alpha: false,
})

const sizeEnum = {
  'mini': '180px',
  'small': '220px',
  'default': '260px',
  'middle': '300px',
  'large': '340px',
  'full': "100%"
}
const styles = computed(() => {
  return {
    width: props.width ? props.width : sizeEnum[props.size],
    borderColor: `transparent transparent ${color.value.hexString} transparent`,
    contrastingColor: `${getContrastingColor(color.value)}`
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
