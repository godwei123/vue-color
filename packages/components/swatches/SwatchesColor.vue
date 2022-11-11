<template>
  <div class="swatches-color" :style="styles">
    <Swatch :color="color" @click="onClick">
      <div class="checked" v-show="active">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <g clip-path="url(#clip0_831_1507)">
            <path
                d="M7.29609 11.4902C6.92912 11.7874 6.40422 11.7874 6.03725 11.4902L0 6.6L1.48148 5.4L6.66667 9.6L18.5185 0L20 1.2L7.29609 11.4902Z"
                :fill="contrastingColor"/>
          </g>
          <defs>
            <clipPath id="clip0_831_1507">
              <rect width="20" height="12" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </Swatch>
  </div>

</template>

<script setup lang="ts">

import Swatch from "@/common/Swatch.vue";
import {ColorInput} from "tinycolor2";
import {computed} from "vue";
import {Direction} from "@/interface";
import {getContrastingColor} from "@/utils/color";

const props = withDefaults(defineProps<{ color: ColorInput, active: boolean, direction: Direction }>(), {})
const emit = defineEmits(['change'])
const contrastingColor = computed(() => getContrastingColor(props.color))

const styles = computed(() => {
  let s = {}
  if (props.direction === 'vertical') {
    s = {...s, marginBottom: '1px'}
  } else {
    s = {...s, marginRight: '1px'}
  }
  return {
    ...s
  }
})

const onClick = (color: ColorInput) => {
  emit('change', color)
}
</script>

<style scoped>

.swatches-color {
  width: 40px;
  height: 24px;
  cursor: pointer;
}

.checked {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
