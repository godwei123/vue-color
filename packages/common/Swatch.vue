<template>
  <div class="swatch" tabindex="-1" @focus="handleFocus" @blur="handleBlur"
       :style="styles">
    <Checkboard class="swatch-checkboard" v-if="alpha"></Checkboard>
    <div class="swatch" @click="handleClick">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkboard from './Checkboard.vue'
import {computed, ComputedRef, CSSProperties, ref} from "vue";
import {ColorInput} from "tinycolor2";

// [{background:props.color},focus ? focusStyle : {background:props.color}]
interface SwatchPropsType {
  color: ColorInput,
  alpha?: boolean,
  focusStyle?: CSSProperties
}


const props = withDefaults(defineProps<SwatchPropsType>(), {
  alpha: false
})
const emits = defineEmits(['click'])

const focus = ref(false)

const handleFocus = () => {
  focus.value = true
}
const handleBlur = () => {
  focus.value = false
}

const styles: ComputedRef<any> = computed(() => {
  let s = focus ? props.focusStyle : {background: props.color}
  return {
    background: props.color as string,
    ...s
  }
})

const handleClick = (e: Event) => emits('click', props.color, e)

</script>

<style scoped>
.swatch {
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  outline: none;
}

.swatch-checkboard {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
