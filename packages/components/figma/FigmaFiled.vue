<template>
  <div class="figma-filed">
    <select class="figma-select" v-model="tabId">
      <option :value="TYPE.hex">Hex</option>
      <option :value="TYPE.rgb">RGB</option>
      <option :value="TYPE.css">CSS</option>
      <option :value="TYPE.hsl">HSL</option>
      <option :value="TYPE.hsb">HSB</option>
    </select>
    <div class="flex border" tabindex="0" v-show="tabId===TYPE.css" @click="handleCopy">
      <edit-input readonly :styles="cssStyles" :value="color.rgbString"/>
    </div>
    <div class="flex border" tabindex="0" v-show="tabId===TYPE.hex" @click="handleCopy">
      <edit-input readonly :styles="hexStyles" :value="color.hex"/>
      <div class="line"></div>
      <edit-input readonly :styles="hexStyles" :value="color.percentageRgb.a"/>
    </div>
    <div class="flex border" tabindex="0" v-show="tabId===TYPE.hsl ||tabId===TYPE.hsb ||tabId===TYPE.rgb"
         @click="handleCopy">
      <edit-input readonly :styles="rgbStyles" :value="inputValue?.a ?? ''"/>
      <div class="line"></div>
      <edit-input readonly :styles="rgbStyles" :value="inputValue?.b ?? ''"/>
      <div class="line"></div>
      <edit-input readonly :styles="rgbStyles" :value="inputValue?.c ?? ''"/>
      <div class="line"></div>
      <edit-input readonly :styles="rgbStyles" :value="inputValue?.d ?? ''"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditInput from "@/common/EditInput.vue";
import {ColorObject} from "@/interface";
import {computed, ComputedRef, ref, CSSProperties} from "vue";

const TYPE = ref({
  hex: 'HEX',
  rgb: 'RGB',
  css: 'CSS',
  hsl: 'HSL',
  hsb: 'HSB',
})

interface FigmaFieldPropsType {
  color: ColorObject
}


const props = withDefaults(defineProps<FigmaFieldPropsType>(), {})

const tabId = ref(TYPE.value.hex)
const inputValue = computed(() => {
  if (tabId.value === TYPE.value.rgb) {
    return {
      a: props.color.rgb.r,
      b: props.color.rgb.g,
      c: props.color.rgb.b,
      d: props.color.rgb.a
    }
  } else if (tabId.value === TYPE.value.hsl) {
    return {
      a: Math.round(props.color.hsv.h),
      b: `${Math.round(props.color.hsl.s * 100)}%`,
      c: `${Math.round(props.color.hsl.l * 100)}%`,
      d: props.color.hsl.a
    }

  } else if (tabId.value === TYPE.value.hsb) {
    return {
      a: Math.round(props.color.hsv.h),
      b: `${Math.round(props.color.hsv.s * 100)}%`,
      c: `${Math.round(props.color.hsv.v * 100)}%`,
      d: props.color.hsv.a
    }
  }
})


const cssStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    input: {
      width: '100%',
      border: "none",
      outline: 'none',
      padding: '2px 0px 2px 4px'
    }
  }
})

const hexStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    input: {
      width: '100%',
      border: "none",
      outline: 'none',
      padding: '2px 0px 2px 4px'
    }
  }
})

const rgbStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    input: {
      width: '100%',
      border: "none",
      outline: 'none',
      padding: '2px 0px 2px 4px'
    }
  }
})
const handleCopy = () => {
  if (tabId.value === TYPE.value.hex) {
    window.navigator.clipboard.writeText(props.color.hexString)
  } else if (tabId.value === TYPE.value.rgb) {
    window.navigator.clipboard.writeText(props.color.rgbString)
  } else if (tabId.value === TYPE.value.css) {
    window.navigator.clipboard.writeText(props.color.percentageRgbString)
  } else if (tabId.value === TYPE.value.hsl) {
    window.navigator.clipboard.writeText(props.color.hslString)
  } else if (tabId.value === TYPE.value.hsb) {
    window.navigator.clipboard.writeText(props.color.hsvString)
  }
}
</script>

<style scoped>
.figma-filed {
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: space-between;
  padding-top: 10px;
  column-gap: 4px;
}

.figma-select {

}

.flex {
  display: flex;
}

.border {
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 4px;
  padding: 0 4px;
}

.border:focus-within {
  border: 2px solid rgba(78, 123, 234, 0.84);
}

.line {
  border-right: 1px solid rgba(0, 0, 0, .2);
}
</style>
