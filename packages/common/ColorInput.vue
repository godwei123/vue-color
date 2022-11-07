<template>
  <div class="color-input-wrap">
    <div class="format-select-wrap">
      <select class="format-select" @change="handleChange">
        <option>Hex</option>
        <option>RGB</option>
        <option>HLS</option>
        <option>HLB</option>
        <option>CSS</option>
      </select>
    </div>

    <div class="value-wrap">
      <HexInput type="hex"/>
      <WInput/>
    </div>

  </div>
</template>

<script setup lang="ts">
import HexInput from "./HexInput.vue";
import WInput from "./WInput.vue";

const handleChange = (e) => {

}
</script>

<style scoped>

</style>
