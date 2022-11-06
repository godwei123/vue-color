<template>
  <div class="wrap">
    <div class="bg"/>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrap {
  position: relative;
  display: inline-block;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f6f6f6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 2px 5px rgba(0, 0, 0, .16);
}

.content {
  position: relative;
}
</style>
