<template>
  <div class="saturation">
    <div class="saturation-white">
      <div class="saturation-black"></div>
      <div class="pointer">
        <div class="pointer-circle"></div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.saturation-white {
  background: -webkit-linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

.saturation-black {
  background: -webkit-linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}

.pointer {
  position: absolute;
  cursor: default;
}

.pointer-circle {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 2px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3),
  0 0 1px 2px rgba(0, 0, 0, .4);
  border-radius: 50%;
  cursor: default;
  transform: translate(-2px, -2px);

}
</style>
