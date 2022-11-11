<template>
  <div class="wrap">
    <div class="bg position-absolute"/>
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
  background: #f6f6f6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 2px 5px rgba(0, 0, 0, .16);
}

.content {
  position: relative;
}
</style>
