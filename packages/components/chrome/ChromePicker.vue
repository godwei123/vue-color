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
      </div>
      <ChromeFiled :color="color" @change="change"/>
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
import Pointer from "@/common/Pointer.vue";

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
  box-shadow: 0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3);
}

.chrome-saturation {
  width: 100%;
  padding: 30% 0;
  position: relative;
  overflow: hidden;
}

.body {
  padding: 12px;

}

.controls {
  display: flex;
}

.color {
  width: 32px;
  display: flex;
  align-items: center;
}

.swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.active {
  border-radius: 50%;
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
