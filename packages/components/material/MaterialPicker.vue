<template>
  <Raised>
    <div class="picker material-picker" :style="{width:width}">
      <edit-input :value="color.hexString" label="Hex" :styles="InputStyle" @change="handleChange"/>
      <div class="flex-box">
        <div class="edit-input-item">
          <edit-input pack drag-label :value="color.rgb.r" label="R" :styles="RGBInputStyle" @change="handleChange"/>
        </div>
        <div class="edit-input-item">
          <edit-input pack drag-label :value="color.rgb.g" label="G" :styles="RGBInputStyle" @change="handleChange"/>
        </div>
        <div class="edit-input-item">
          <edit-input pack drag-label :value="color.rgb.b" label="B" :styles="RGBInputStyle" @change="handleChange"/>
        </div>
      </div>
    </div>
  </Raised>
</template>

<script setup lang="ts">
import Raised from "@/common/Raised.vue";
import EditInput from "@/common/EditInput.vue";
import {computed, ComputedRef, CSSProperties} from "vue";
import {ColorFormat, ColorObject} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";
import {ColorInput} from "tinycolor2";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: 'MaterialPicker'
})

interface MaterialPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  width?: string
}

const props = withDefaults(defineProps<MaterialPropsType>(), {
  format: 'rgb',
  width: '140px'
})

const InputStyle: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      fontSize: '18px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: `2px solid rgb(0,0,0,.8)`,
      outline: 'none',
      height: '30px',
      background: 'transparent',
      "font-family": 'inherit'
    },
    label: {
      fontSize: '20px',
      color: '#999999',
      textTransform: 'capitalize',
    },

  }
})
const RGBInputStyle: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      "column-gap": '4px'
    },
    input: {
      width: '100%',
      marginTop: '2px',
      fontSize: '15px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: '1px solid rgba(0,0,0,.6)',
      outline: 'none',
      height: '26px',
      background: 'transparent'
    },
    label: {
      fontSize: '16px',
      color: '#999999',
      textTransform: 'capitalize',
    },
  }
})

const emit = defineEmits(['update:modelValue'])


const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const handleChange = (data: string | { R?: number, G?: number, B?: number }) => {
  if (typeof data === 'object') {
    change(convertColor({
      r: data.R || color.value.rgb.r,
      g: data.G || color.value.rgb.g,
      b: data.B || color.value.rgb.b,
    }))
  } else {
    change(convertColor(data))
  }
}

const change = (data: ColorObject | string) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.material-picker {
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  font-family: inherit;
}

.flex-box {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.edit-input-item {
  flex: 1;
}
</style>
