<template>
  <div class="compact-fields">
    <div class="compact-active"></div>
    <EditableInput class="color-hex" :styles="styles" :maxlength="7" color="#FFFFFF"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" color="222" label="R"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" color="121" label="G"/>
    <EditableInput :styles="styles" style="flex: 1" :maxlength="3" color="202" label="B"/>
  </div>
</template>

<script setup lang="ts">

import EditableInput from "../../common/EditableInput.vue";

const styles = {
  background: 'transparent',
  boxShadow: 'none',
  padding: 0,
  fontSize: '14px'
}
</script>

<style scoped>
.compact-fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.color-hex {
  padding: 0 5px;
  flex-basis: 60px;
}

.compact-active {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background: #000;
}
</style>
