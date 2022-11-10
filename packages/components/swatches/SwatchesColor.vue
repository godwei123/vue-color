<template>
  <div class="swatches-color">
    <Swatch :color="color">
      <div class="checked">
        <!--      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">-->
        <!--        <g clip-path="url(#clip0_831_1507)">-->
        <!--          <path fill-rule="evenodd" clip-rule="evenodd"-->
        <!--                d="M7.29609 11.4902C6.92912 11.7874 6.40422 11.7874 6.03725 11.4902L0 6.6L1.48148 5.4L6.66667 9.6L18.5185 0L20 1.2L7.29609 11.4902Z"-->
        <!--                fill="#240808"/>-->
        <!--        </g>-->
        <!--        <defs>-->
        <!--          <clipPath id="clip0_831_1507">-->
        <!--            <rect width="20" height="12" fill="white"/>-->
        <!--          </clipPath>-->
        <!--        </defs>-->
        <!--      </svg>-->


      </div>
    </Swatch>
  </div>

</template>

<script setup lang="ts">

import Swatch from "@/common/Swatch.vue";
import {ColorInput} from "tinycolor2";

withDefaults(defineProps<{ color: ColorInput, active: boolean }>(), {})
</script>

<style scoped>

.swatches-color {
  width: 40px;
  height: 24px;
  cursor: pointer;

}
</style>
