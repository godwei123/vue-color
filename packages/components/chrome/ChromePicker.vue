<template>
  <div class="picker chrome-picker" :style="{width:width}">
    <div class="chrome-saturation">
      <Saturation :color="color" @click="change"/>
    </div>
    <div class="body">
      <div class="controls">
        <div class="color">
          <div class="swatch">
            <div class="active position-absolute"
                 :style="{background: `rgba(${ color.rgb.r }, ${ color.rgb.g }, ${ color.rgb.b }, ${ color.rgb.a })`}"></div>
            <Checkboard/>
          </div>
        </div>
        <div class="toggles">
          <div class="hue">
            <Hue :color="color"/>
          </div>
          <div class="alpha">
            <Alpha :color="color"/>
          </div>
        </div>
      </div>
      <ChromeFiled :color="color"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Saturation from "@/common/Saturation.vue";
import Checkboard from "@/common/Checkboard.vue";
import Hue from "@/common/Hue.vue";
import Alpha from "@/common/Alpha.vue";
import ChromeFiled from "./ChromeFileds.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject} from "@/interface";
import {computed, ComputedRef} from "vue";
import {convertColor, formatColor} from "@/utils/color";

interface ChromePropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  width?: string
}

const props = withDefaults(defineProps<ChromePropsType>(), {
  format: 'rgb',
  width: '250px'
})
const emit = defineEmits(['update:modelValue'])

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
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3);
  box-sizing: initial;
  font-family: "IBM Plex Mono", 'Menlo', monospace, sans-serif;
}

.chrome-saturation {
  width: 100%;
  padding: 30% 0;
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}

.body {
  padding: 16px 16px 12px;

}

.controls {
  display: flex;
}

.color {
  width: 32px;
}

.swatch {
  margin-top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.active {

  border-radius: 8px;
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

.alpha {
  height: 10px;
  position: relative;
}
</style>
