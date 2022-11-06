<template>
  <Raised style="height: fit-content;">

    <div class="compact compact-picker">
      <CompactColor v-for="color in colors" :key="color" :color="color" :active="color===modelValue"
                    @click="handleChange"/>
    </div>
  </Raised>
</template>

<script setup lang="ts">

import Raised from "../../common/Raised.vue";
import CompactColor from "./CompactColor.vue";

defineProps({
  colors: {
    type: Array,
    default: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
      '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
      '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400',
      '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
      '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
      '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
    ]
  },
  modelValue: {}
})
const emit = defineEmits(['update:modelValue'])

const handleChange = (color) => {
  emit('update:modelValue', color)
}
</script>

<style scoped>
.compact {
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: inherit;
  width: 240px;
  height: fit-content;
}
</style>
