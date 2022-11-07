<script setup lang="ts">
import BlockPicker from "../packages/components/block/BlockPicker.vue"
import {ref, watch} from "vue";
import TwitterPicker from "../packages/components/twitter/TwitterPicker.vue";
import GithubPicker from "../packages/components/github/GithubPicker.vue";
import CirclePicker from "../packages/components/circle/CirclePicker.vue";
import CompactPicker from "../packages/components/compact/CompactPicker.vue";
import EditableInput from "../packages/common/EditableInput.vue";
import SInput from "./components/SInput.vue";

const value = ref('#194d33')
const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
  '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']

watch(value, () => {
  console.log(value)
})

</script>

<template>

  <div class="box"
       style="display:flex;height: 100vh;justify-content: center;align-items: center;flex-direction: column;">
    <div :style="{width: '100px',height: '100px',background:value,marginBottom:'50px'}"></div>

    <div style="display:flex;gap: 50px;flex-wrap: wrap">
      <BlockPicker v-model="value" :colors="colors" width="250px"/>
      <TwitterPicker v-model="value"/>
      <GithubPicker v-model="value"/>
      <CirclePicker v-model="value"/>
      <CompactPicker v-model="value"/>
      <EditableInput label="R"/>
      <SInput/>

    </div>
  </div>
</template>

<style scoped>
.box {
  font-family: "IBM Plex Mono", monospace, sans-serif;
  background: #eeeeee;
}
</style>
