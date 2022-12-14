<template>

  <div class="picker sketch-picker" :style="{width:width}">
    <div class="sketch-saturation">
      <Saturation :color="color" @click="change"/>
    </div>
    <div class="body">
      <div class="controls">
        <div class="toggles">
          <div class="hue">
            <Hue :color="color" @change="hueChange">
              <Pointer class="hue-pointer" :styles="styles.huePointer"></Pointer>
            </Hue>
          </div>
          <div class="alpha">
            <Alpha :color="color" @change="alphaChange">
              <Pointer class="alpha-pointer" :styles="styles.alphaPointer"></Pointer>
            </Alpha>
          </div>
        </div>
        <div class="color">
          <div class="swatch">
            <div class="active position-absolute"
                 :style="{background: `rgba(${ color.rgb.r }, ${ color.rgb.g }, ${ color.rgb.b }, ${ color.rgb.a })`}"></div>
            <Checkboard/>
          </div>
        </div>
      </div>
      <SketchFiled :color="color" @change="change"/>
      <div style="margin: 10px 0; border-bottom: 1px solid rgba(0,0,0,.2)"></div>
      <SketchColor :presetColors="presetColors" @change="change"></SketchColor>
    </div>
  </div>

</template>

<script setup lang="ts">

import Saturation from "@/common/Saturation.vue";
import Checkboard from "@/common/Checkboard.vue";
import Pointer from "@/common/Pointer.vue";
import Alpha from "@/common/Alpha.vue";
import Hue from "@/common/Hue.vue";
import SketchFiled from "@/components/sketch/SketchFiled.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject} from "@/interface";
import {computed, ComputedRef} from "vue";
import {convertColor, formatColor} from "@/utils/color";
import SketchColor from "@/components/sketch/SketchColor.vue";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: 'SketchPicker'
})

interface SketchPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  width?: string,
  presetColors?: Array<ColorInput>
}

const props = withDefaults(defineProps<SketchPropsType>(), {
  format: 'rgb',
  width: '220px',
  presetColors: () => ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']

})
const emit = defineEmits(['update:modelValue'])

const styles = computed(() => {
  return {
    alphaPointer: {
      left: `${color.value.rgb.a * 100}%`,
    },
    huePointer: {
      left: `${(color.value.hsl.h * 100) / 360}%`,
    }
  }
})

const hueChange = (color: ColorObject) => {
  change(color)
}

const alphaChange = (color: ColorObject) => {
  change(color)
}

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}

</script>

<style scoped>

.picker {
  background: #fff;
  padding: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3);
}

.sketch-saturation {
  width: 100%;
  padding: 30% 0;
  position: relative;
  overflow: hidden;
}

.body {
  padding: 10px 5px;

}

.controls {
  display: flex;
  column-gap: 5px;
}

.color {
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

}

.swatch {
  width: 26px;
  height: 26px;
  position: relative;
  overflow: hidden;
}

.active {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
  z-index: 2;
}

.toggles {
  flex: 1;
}

.hue {
  height: 10px;
  position: relative;
  margin-bottom: 8px;
}

.hue-pointer, .alpha-pointer {
  width: 12px;
  height: 12px;
  transform: translate(-6px, -1px);
  transition: left linear .1s
}

.alpha {
  height: 10px;
  position: relative;
}
</style>
