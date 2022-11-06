<template>
  <div class="color-input-wrap">
    <span class="input-label" v-if="label">{{ label }}</span>
    <div class="input-hash" v-if="hash">#</div>
    <input
        :class="['color-input',border?'':'box-shadow-none']"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from "vue";

defineProps({
  placeholder: {type: String, default: ""},
  label: {type: String, default: ""},
  hash: {type: Boolean, default: false},
  border: {type: Boolean, default: false},
  modelValue: {}
})
defineEmits(['update:modelValue']);

</script>

<style scoped>
.color-input-wrap {
  position: relative;
  display: flex;
  align-items: stretch;
}

.box-shadow-none {
  box-shadow: none;
}

.input-label {
  padding: 5px;
}

.input-hash {
  box-sizing: border-box;
  background: #F0F0F0;
  height: 30px;
  width: 30px;
  border-radius: 4px 0 0 4px;
  color: #98A1A4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-input {
  width: 100%;
  font-size: 16px;
  color: #666;
  border: 0;
  outline: none;
  box-shadow: inset 0 0 0 1px #ddd;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: inherit;
  font-weight: inherit;
  flex: 1;
}
</style>
