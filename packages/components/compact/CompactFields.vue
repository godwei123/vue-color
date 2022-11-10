<template>
  <div class="compact-fields">
    <div class="compact-active" :style="{background: color.hexString}"></div>
    <edit-input pack :styles="InputStyle" :value="color.hexString" @change="change"/>
    <edit-input pack :styles="RGBInputStyle" :value="color.rgb.r" label="R" @change="change"/>
    <edit-input pack :styles="RGBInputStyle" :value="color.rgb.g" label="G" @change="change"/>
    <edit-input pack :styles="RGBInputStyle" :value="color.rgb.b" label="B" @change="change"/>
  </div>
</template>

<script setup lang="ts">

import {ColorObject} from "@/interface";
import {convertColor} from "@/utils/color";
import EditInput from "@/common/EditInput.vue";
import {computed, ComputedRef, CSSProperties} from "vue";

interface FieldsPropsType {
  color: ColorObject
}

const props = defineProps<FieldsPropsType>()
const emit = defineEmits(['change'])
const styles = {
  background: 'transparent',
  boxShadow: 'none',
  padding: 0,
  fontSize: '14px'
}

const InputStyle: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      flex: '6',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      padding: '0px',
      paddingLeft: '10%',
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: '14px',
      color: '#333',
      height: '16px',
      "font-family": 'inherit'
    },
    label: {
      display: 'none',
    },

  }
})
const RGBInputStyle: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      flex: '3',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '70%',
      padding: '0px',
      paddingLeft: '30%',
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: '14px',
      color: '#333',
      height: '16px',
      "font-family": 'inherit'
    },
    label: {
      position: 'absolute',
      top: '0px',
      bottom: 0,
      left: '0px',
      right: 0,
      lineHeight: '16px',
      textTransform: 'uppercase',
      fontSize: '14px',
      color: '#999',
      "font-family": 'inherit'
    },
  }
})


const change = (data: string | { R?: number, G?: number, B?: number }) => {
  if (typeof data === 'object') {
    emit('change', convertColor({
      r: data.R || props.color.rgb.r,
      g: data.G || props.color.rgb.g,
      b: data.B || props.color.rgb.b,
    }))
  } else {
    emit('change', convertColor(data))
  }
}
</script>

<style scoped>
.compact-fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.color-hex {
  padding: 0 5px;
  flex-basis: 60px;
}

.compact-active {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background: #000;
}
</style>
