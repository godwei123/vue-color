<template>
  <div class="card twitter-picker" :style="{width:width}">
    <div class="triangle-shadow" :style="triangleShadowStyle"></div>
    <div class="triangle" :style="triangleStyle"></div>
    <div class="body">
      <Swatch v-for="color in colors"
              :key="color"
              :color="color"
              class="swatch"
              @click="onClick(color)"
      ></Swatch>
      <EditableInput hash style="width: 135px;" v-model="modelValue"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import EditableInput from "../../common/EditableInput.vue"
import Swatch from "../../common/Swatch.vue";

const props = defineProps({
  width: {
    type: String, default: '276px'
  },
  colors: {
    type: Array, default: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
      '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
  },
  triangle: {
    type: String,
    default: 'top-left'
  },
  modelValue: {}
})
const emit = defineEmits(['update:modelValue'])

const triangleShadowStyle = computed(() => {
  if (props.triangle === 'hide') {
    return {display: 'none'}
  } else if (props.triangle === 'top-left') {
    return {
      top: '-11px',
      left: '12px',
    }
  } else if (props.triangle === 'top-right') {
    return {
      top: '-11px',
      right: '12px',
    }
  }
})
const triangleStyle = computed(() => {
  if (props.triangle === 'hide') {
    return {display: 'none'}
  } else if (props.triangle === 'top-left') {
    return {
      top: '-10px',
      left: '12px',
    }
  } else if (props.triangle === 'top-right') {
    return {
      top: '-10px',
      right: '12px',
    }
  }
})

const onClick = color => {
  console.log(color)
  emit('update:modelValue', color)
}

</script>

<style scoped>
.card {
  background: #ffffff;
  border: 0 solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  height: fit-content;
}

.body {
  padding: 15px 9px 9px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}


.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent #fff transparent;
  position: absolute
}

.triangle-shadow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 9px 10px 9px;
  border-color: transparent transparent rgba(0, 0, 0, .1) transparent;
  position: absolute;
}

.hash {
  background: #F0F0F0;
  height: 30px;
  width: 30px;
  border-radius: 4px 0 0 4px;
  float: left;
  color: #98A1A4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swatch {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}
</style>
