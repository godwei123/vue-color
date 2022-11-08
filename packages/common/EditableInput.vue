<template>
  <div class="color-input-wrap">
    <span class="input-label" v-if="label">{{ label }}</span>
    <div class="input-hash" v-if="hash">#</div>
    <input
        :class="['color-input',border?'':'box-shadow-none']"
        type="text"
        :placeholder="placeholder"
        :value="color"
        @keyup.enter="onBlur"
        @blur="onBlur"
        :style="styles"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from "vue";

interface EditInputPropsType {
  placeholder?: string,
  label?: string,
  hash?: boolean,
  border?: boolean,
  color: string,
  radius?: string
}

const props = withDefaults(defineProps<EditInputPropsType>(), {
  hash: false,
  border: false
})
const emit = defineEmits(['change']);

const styles = computed(() => {
  return {
    borderRadius: props.radius
  }
})
const onBlur = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}


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
