<template>
  <Raised>
    <div class="picker swatches-picker overflow" :style="{ width: width, height: height }">
      <div class="body">
        <SwatchesGroup
            :direction="direction"
            v-for="(item,index) in colors"
            :key="index"
            :colors="item"
            :color="color"
            @change="change"
        />
      </div>
    </div>
  </Raised>
</template>

<script setup lang="ts">
import Raised from '@/common/Raised.vue';
import SwatchesGroup from './SwatchesGroup.vue';
import {ColorInput} from 'tinycolor2';
import {computed, ComputedRef, CSSProperties} from 'vue';
import {ColorFormat, ColorObject, Direction} from '@/interface';
import {convertColor, formatColor} from '@/utils/color';
import {lightColors} from "@/assets/colors";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: 'SwatchesPicker'
})

interface SwatchesPropsType {
  modelValue: ColorInput;
  format?: ColorFormat;
  colors: Array<Array<ColorInput>>;
  width?: string;
  height?: string;
  direction?: Direction;
}

const props = withDefaults(defineProps<SwatchesPropsType>(), {
  width: '428px',
  height: '240px',
  format: 'rgb',
  direction: 'vertical',
  colors: () => lightColors
});

const emit = defineEmits(['update:modelValue']);

const styles = computed(() => {
  return {};
});

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue);
});

const change = (data: ColorObject | string) => {
  emit('update:modelValue', formatColor(data, props.format), data);
};
</script>

<style scoped>
.swatches-picker {
  box-sizing: border-box;
}

.overflow {
  overflow: scroll;

}

.body {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px;
}
</style>
