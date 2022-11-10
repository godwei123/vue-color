<script setup lang="ts">
import {ref, watch} from "vue";
import AlphaPicker from "../packages/components/alpha/AlphaPicker.vue";
import HuePicker from "../packages/components/hue/HuePicker.vue";
import {Placement} from "../packages/interface";
import CompactPicker from "../packages/components/compact/CompactPicker.vue";
import MaterialPicker from "../packages/components/material/MaterialPicker.vue";
import SwatchesPicker from "../packages/components/swatches/SwatchesPicker.vue";


const value = ref('#194d33')
const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
  '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

watch(value, () => {
  console.log(value)
})

const num = ref(200)

const places: Array<Placement> = []

</script>

<template>

  <div class="box"
       style="display:flex;min-height: 100vh;justify-content: center;align-items: center;flex-direction: column;">
    <div :style="{width: '100px',height: '100px',background:value,marginBottom:'50px'}"></div>

    <div style="display:flex;flex-wrap: wrap;flex-direction: column">
      <div>
        <AlphaPicker round v-model="value" style="margin: 20px;"/>
      </div>
      <div>
        <HuePicker round v-model="value" style="margin: 20px;"/>
      </div>
      <div>
        <SwatchesPicker v-model="value"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  font-family: "IBM Plex Mono", monospace, sans-serif;
  background: #eeeeee;
}
</style>
