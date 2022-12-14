<template>
  <Raised style="height: fit-content;">
    <div class="compact compact-picker" :style="{width:width}">
      <div class="compact-color-wrap">
        <CompactColor
            v-for="(item,index) in colors"
            :key="index"
            :color="item"
            :active="colorEquals(color,item)"
            @change="change"/>
      </div>
      <CompactFields :color="color" @change="change"/>
    </div>
  </Raised>
</template>

<script setup lang="ts">
import Raised from "@/common/Raised.vue";
import CompactColor from "./CompactColor.vue";
import {ColorInput} from "tinycolor2";
import {ColorFormat, ColorObject} from "@/interface";
import {computed, ComputedRef} from "vue";
import {convertColor, formatColor, colorEquals} from "@/utils/color";
import CompactFields from "./CompactFields.vue";
import {defineOptions} from "unplugin-vue-define-options/macros";

defineOptions({
  name: 'CompactPicker'
})

interface CompactPropsType {
  modelValue: ColorInput
  format?: ColorFormat,
  colors?: Array<ColorInput>,
  width?: string
}

const props = withDefaults(defineProps<CompactPropsType>(), {
  format: 'rgb',
  width: '240px',
  colors: () => ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
    '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
    '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400',
    '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
    '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
    '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
  ]
})
const emit = defineEmits(['update:modelValue'])

const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject | string) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}
</script>

<style scoped>
.compact {
  padding: 10px;
  box-sizing: inherit;
  height: fit-content;
}

.compact-color-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15px);
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding-bottom: 5px;
}
</style>
