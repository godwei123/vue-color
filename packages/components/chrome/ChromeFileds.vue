<template>
  <div class="chrome-filed">
    <div v-show="activeId===0">
      <edit-input :styles="RGBStyles" :value="color.hexString" label="Hex" @change="handleChange"/>
    </div>
    <div class="chrome-edits" v-show="activeId===1">
      <edit-input pack :styles="RGBStyles" :value="color.rgb.r" label="R" @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="color.rgb.g" label="G" @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="color.rgb.b" label="B" @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="color.rgb.a" label="A" @change="handleChange"></edit-input>
    </div>
    <div class="chrome-edits" v-show="activeId===2">
      <edit-input pack :styles="RGBStyles" :value="Math.round(color.hsl.h)" label="H"
                  @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="`${ Math.round(color.hsl.s * 100) }%`" label="S"
                  @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="`${ Math.round(color.hsl.l * 100) }%`" label="L"
                  @change="handleChange"></edit-input>
      <edit-input pack :styles="RGBStyles" :value="color.hsl.a" label="A" @change="handleChange"></edit-input>
    </div>
    <div class="grid-right" @click="changActive">
      <svg viewBox="0 0 24 24"
           style="width: 24px; height: 24px; border: 1px solid transparent; border-radius: 5px; background: transparent;">
        <path fill="#333" d="M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
              style="background: transparent;"></path>
        <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ColorObject} from "@/interface";
import EditInput from "@/common/EditInput.vue";
import {computed, ComputedRef, CSSProperties, ref} from "vue";
import {convertColor} from "@/utils/color";

const props = withDefaults(defineProps<{ color: ColorObject }>(), {})
const emit = defineEmits(['change'])

const activeId = ref(0)
const changActive = () => {
  activeId.value = (activeId.value + 1) % 3
}
const RGBStyles: ComputedRef<{ wrap?: CSSProperties, input?: CSSProperties, label?: CSSProperties }> = computed(() => {
  return {
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    input: {
      fontSize: '11px',
      color: '#333',
      width: '100%',
      borderRadius: '2px',
      border: 'none',
      boxShadow: 'inset 0 0 0 1px #dadada',
      height: '21px',
      textAlign: 'center',
    },
    label: {
      textTransform: 'uppercase',
      fontSize: '11px',
      lineHeight: '11px',
      color: '#969696',
      textAlign: 'center',
      display: 'block',
      marginTop: '12px',
    },
  }
})

// string | { R?: number, G?: number, B?: number, A?: number } | { H?: number, S?: number, L?: number, A?: number }
const handleChange = (data: any) => {
  if (typeof data === 'object') {
    if (data.R || data.G || data.B || activeId.value === 1) {
      emit('change', convertColor({
        r: data.R || props.color.rgb.r,
        g: data.G || props.color.rgb.g,
        b: data.B || props.color.rgb.b,
        a: data.A || props.color.rgb.a,
      }))
    } else if (data.H || data.S || data.L || activeId.value === 2) {
      emit('change', convertColor({
        h: data.H || props.color.hsl.h,
        s: data.S || props.color.hsl.s,
        l: data.L || props.color.hsl.l,
        a: data.A || props.color.hsl.a,
      }))
    }
  } else {
    emit('change', convertColor(data))
  }
}
</script>

<style scoped>
.chrome-filed {
  padding: 20px 0 0 0;
  display: grid;
  grid-template-columns:  6fr 1fr;
  gap: 4px;
  justify-content: space-between;
}

.chrome-edits {
  display: flex;
  column-gap: 8px;
}

.grid-right {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

}
</style>
