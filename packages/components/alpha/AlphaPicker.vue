<template>
  <div
      :style="{width:`${width}px`,height:`${height}px`,position:'relative'}"
      class="picker alpha-picker">
    <Alpha
        radius="4px"
        :color="color"
        :direction="direction"
        @change="change"
    >
      <AlphaPointer :direction="direction" :color="color"/>
    </Alpha>
  </div>
</template>

<script setup lang="ts">
import Alpha from "../../common/Alpha.vue"
import AlphaPointer from "./AlphaPointer.vue"
import {ColorFormats, ColorInput} from "tinycolor2";
import {convertColor} from "../../utils/color";
import {computed} from "vue";

const props = defineProps({
  width: {type: Number, default: 361},
  height: {type: Number, default: 16},
  direction: {type: String, default: 'horizontal'},
  modelValue: {},
})
const emit = defineEmits(["update:modelValue"])
const color = computed(() => {
  return convertColor(props.modelValue as ColorInput)
})

const change = (data: object) => {
  emit("update:modelValue", data?.rgb ?? color)
}
</script>

<style scoped>

</style>
