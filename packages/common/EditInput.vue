<template>
  <div class="edit-input-wrap" :style="styles.wrap">
    <input
        :id="inputId"
        :value="value"
        :style="styles.input"
        :placeholder="placeholder"
        @keydown="handleKeyDown"
        @change="handleChange"
        @blur="handleBlur"
        :readonly="readonly"
    >
    <label
        :for="inputId"
        v-if="label && !hideLabel"
        @mousedown="handleMouseDown"
        :style="{...styles.label,cursor: dragLabel ? 'ew-resize':'auto'}"
    >{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import {CSSProperties, onUnmounted, ref} from "vue";
import {uid} from "@/utils/uid";

const DEFAULT_ARROW_OFFSET = 1

const UP_KEY_CODE = 38
const DOWN_KEY_CODE = 40
const VALID_KEY_CODES = [
  UP_KEY_CODE,
  DOWN_KEY_CODE
]
const isValidKeyCode = (keyCode: any) => VALID_KEY_CODES.indexOf(keyCode) > -1

interface EditInputPropsType {
  value: string | number
  styles?: { wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties },
  label?: string,
  hideLabel?: boolean
  placeholder?: string
  dragLabel?: boolean
  dragMax?: number
  arrowOffset?: number,
  pack?: boolean,
  readonly?: boolean
}

const props = withDefaults(defineProps<EditInputPropsType>(), {
  dragMax: 255,
  pack: false,
  readonly: false,
  dragLabel: false,
  styles: () => ({
    wrap: {},
    input: {},
    label: {}
  })
})

const inputId = `edit-input-${uid()}`

const emit = defineEmits(['change'])

const handleDrag = (e: any) => {
  if (props.dragLabel) {
    // TODO 数字输入合法
    const newValue = Math.round(props.value + e.movementX)
    if (newValue >= 0 && newValue <= props.dragMax) {
      emit('change', getValueObjectWithLabel(newValue), e)
    }
  }
}

const handleMouseDown = (e: any) => {
  if (props.dragLabel) {
    e.preventDefault()
    handleDrag(e)
    window.addEventListener('mousemove', handleDrag)
    window.addEventListener('mouseup', handleMouseUp)
  }
}
const handleMouseUp = () => {
  unbindEventListeners()
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleDrag)
  window.removeEventListener('mouseup', handleMouseUp)
}
const getNumberValue = (value: any) => Number(String(value).replace(/%/g, ''))

const getValueObjectWithLabel = (value: any) => {
  return props.pack && props.label ? {
    [props.label]: value
  } : value
}

const setUpdatedValue = (value: unknown, e: any) => {
  emit('change', getValueObjectWithLabel(value), e)
}
const getArrowOffset = () => {
  return props.arrowOffset || DEFAULT_ARROW_OFFSET
}
const handleKeyDown = (e: any) => {
  const value = getNumberValue(e.target.value)
  if (!isNaN(value) && isValidKeyCode(e.keyCode)) {
    const offset = getArrowOffset()
    const updatedValue = e.keyCode === UP_KEY_CODE ? value + offset : value - offset
    setUpdatedValue(updatedValue, e)
  }
}
const handleChange = (e: any) => {
  setUpdatedValue(e.target.value, e)
}
const handleBlur = () => {
  console.log(props.value)
}

onUnmounted(() => {
  unbindEventListeners()
})


</script>

<style scoped>
.edit-input-wrap {
  position: relative;

}
</style>
