<template>
  <div class="sketch-filed">
    <edit-input :value="color.hex" label="Hex" :styles="InputStyles" @change="handleChange"></edit-input>
    <edit-input pack :value="color.rgb.r" label="R" :styles="RGBStyles" @change="handleChange"></edit-input>
    <edit-input pack :value="color.rgb.g" label="G" :styles="RGBStyles" @change="handleChange"></edit-input>
    <edit-input pack :value="color.rgb.b" label="B" :styles="RGBStyles" @change="handleChange"></edit-input>
    <edit-input pack :value="color.rgb.a*100" label="A" :styles="RGBStyles" @change="handleChange"></edit-input>
  </div>
</template>

<script setup lang="ts">
import {ColorObject} from "@/interface";
import EditInput from "@/common/EditInput.vue";
import {computed, ComputedRef, CSSProperties} from "vue";
import {convertColor} from "@/utils/color";

const props = withDefaults(defineProps<{ color: ColorObject }>(), {})
const emit = defineEmits(['change'])

const InputStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      display: "flex",
      justifyContent: 'center',
      flexDirection: 'column',
    },
    input: {
      width: '100%',
      padding: '4px',
      border: 'none',
      boxShadow: 'inset 0 0 0 1px #ccc',
      fontSize: '11px',
    },
    label: {
      display: 'block',
      textAlign: 'center',
      fontSize: '11px',
      color: '#222',
      textTransform: 'capitalize',
    },
  }
})

const RGBStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      display: "flex",
      justifyContent: 'center',
      flexDirection: 'column',
    },
    input: {
      width: '100%',
      padding: '4px',
      border: 'none',
      boxShadow: 'inset 0 0 0 1px #ccc',
      fontSize: '11px',
    },
    label: {
      display: 'block',
      textAlign: 'center',
      fontSize: '11px',
      color: '#222',
      textTransform: 'capitalize',
    },
  }
})


const handleChange = (data: string | { R?: number, G?: number, B?: number, A?: number }) => {
  if (typeof data === 'object') {
    emit('change', convertColor({
      r: data.R || props.color.rgb.r,
      g: data.G || props.color.rgb.g,
      b: data.B || props.color.rgb.b,
      a: (data.A && data.A / 100) || props.color.rgb.a,
    }))
  } else {
    emit('change', convertColor(data))
  }
}
</script>

<style scoped>
.sketch-filed {
  display: grid;
  justify-content: space-between;
  padding: 10px 0 0 0;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  column-gap: 2px;
}
</style>
