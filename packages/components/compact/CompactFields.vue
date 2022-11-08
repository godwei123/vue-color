<template>
  <div class="compact-fields">
    <div class="compact-active" :style="{background: color.hexString}"></div>
    <EditableInput class="color-hex" :styles="styles" :maxlength="7" :color="color.hexString" @change="change"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" :color="color.rgb.r" label="R"
                   @change="change"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" :color="color.rgb.g" label="G"
                   @change="change"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" :color="color.rgb.b" label="B"
                   @change="change"/>
  </div>
</template>

<script setup lang="ts">

import EditableInput from "../../common/EditableInput.vue";
import {ColorObject} from "../../interface";
import {isValid, toHex} from "../../utils/color";

interface FieldsPropsType {
  color: ColorObject
}

const props = defineProps<FieldsPropsType>()
const emit = defineEmits(['click'])
const styles = {
  background: 'transparent',
  boxShadow: 'none',
  padding: 0,
  fontSize: '14px'
}


const change = (value: string, type: string | undefined) => {
  if (type !== undefined && !isValid(value)) {
    return
  }
  let s = ''
  if (type === undefined) {
    s = isValid(value.substring(1)) ? value : props.color.hexString
  } else if (type === 'R') {
    let n = parseInt(value)
    s = `#${toHex(n)}${toHex(props.color.rgb.g)}${toHex(props.color.rgb.b)}`
  } else if (type === 'G') {
    let n = parseInt(value)
    s = `#${toHex(props.color.rgb.r)}${toHex(n)}${toHex(props.color.rgb.b)}`
  } else if (type === 'B') {
    let n = parseInt(value)
    s = `#${toHex(props.color.rgb.r)}${toHex(props.color.rgb.g)}${toHex(n)}`
  }
  emit('click', s)
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
