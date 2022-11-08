<template>
  <div class="picker twitter-picker" :style="{width:width}">
    <div class="triangle-shadow" :style="triangleShadowStyle"></div>
    <div class="triangle" :style="triangleStyle"></div>
    <div class="body">
      <Swatch v-for="item in colors"
              :key="item"
              :color="item"
              class="twitter-swatch"
              @click="change"
      ></Swatch>
      <EditableInput hash style="max-width: 135px;min-width: 100px" :color="color.hex" @change="change"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, ComputedRef, ref} from "vue";
import EditableInput from "../../common/EditableInput.vue"
import Swatch from "../../common/Swatch.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject, Size} from "../../interface";
import {convertColor, formatColor} from "../../utils/color";


interface TwitterPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  triangle?: string,
  size: Size | 'full',
  width?: string
}

const props = withDefaults(defineProps<TwitterPropsType>(), {
  colors: () => ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
    '#ABB8C3', '#EB144C', '#F78DA7'],
  width: '276px',
  triangle: 'top-left',
  format: 'rgb'
})

const emit = defineEmits(['update:modelValue'])

const triangleShadowStyle = computed(() => {
  if (props.triangle === 'hide') {
    return {display: 'none'}
  } else if (props.triangle === 'top-left') {
    return {
      top: '-11px',
      left: '12px',
    }
  } else if (props.triangle === 'top-right') {
    return {
      top: '-11px',
      right: '12px',
    }
  }
})
const triangleStyle = computed(() => {
  if (props.triangle === 'hide') {
    return {display: 'none'}
  } else if (props.triangle === 'top-left') {
    return {
      top: '-10px',
      left: '12px',
    }
  } else if (props.triangle === 'top-right') {
    return {
      top: '-10px',
      right: '12px',
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
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  height: fit-content;

}

.body {
  padding: 15px 9px 9px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
  width: 30px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
}
</style>
