<template>
  <div class="card-swatch"
       @mouseleave="handleMouseLeave"
       @mouseenter="handleMouseEnter"
       @click="handleCopy"
  >
    <Swatch :color="color" @click="onClick">
      <div class="card-box" :style="{color:contrastingColor}">
        <div class="title">{{ color }}</div>
        <div v-show="show" class="value">{{ `${valueObj.rgb.r},${valueObj.rgb.g},${valueObj.rgb.b}` }}</div>
      </div>
    </Swatch>
  </div>
</template>

<script setup lang="ts">
import Swatch from "@/common/Swatch.vue";
import {ColorInput} from "tinycolor2";
import {computed, ref} from "vue";
import {convertColor, getContrastingColor} from "@/utils/color";

const props = withDefaults(defineProps<{ color: ColorInput }>(), {})
const emit = defineEmits(['change'])
const show = ref(false)
const handleMouseEnter = () => {
  show.value = true
}
const handleMouseLeave = () => {
  show.value = false
}
const handleCopy = async () => {
  await window.navigator.clipboard.writeText(valueObj.value.hexString)
}
const contrastingColor = computed(() => getContrastingColor(props.color))
const valueObj = computed(() => convertColor(props.color))

const onClick = (color: ColorInput) => {
  emit('change', color)
}

</script>

<style scoped>
.card-swatch {
  width: 96px;
  height: 46px;
  transition: transform 100ms linear;
}

.card-swatch:hover {
  z-index: 2;
  transform: scale(1.1);
  box-shadow: inset 0 0 3px white;
}

.card-swatch:active {
  transform: scale(1);
}

.card-box {
  height: 100%;
  display: flex;
  text-transform: uppercase;
  font-family: inherit;
  flex-direction: column;
  padding: 5px;
}

.title {
  font-size: 14px;
}

.value {
  font-weight: lighter;
  font-size: 8px;
  user-select: none;
}
</style>
