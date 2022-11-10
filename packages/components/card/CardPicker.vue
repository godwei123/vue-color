<template>
  <div class="picker card-picker" :style="{width:width,height:height}">
    <div class="card-group">
      <CardGroup
          v-for="item in colors"
          :key="item + ''"
          :colors="item"
          :color="color"
      ></CardGroup>
    </div>
  </div>
</template>

<script setup lang="ts">

import CardGroup from './CardGroup.vue'
import {ColorInput} from "tinycolor2";
import {computed, ComputedRef} from "vue";
import {ColorFormat, ColorObject} from "@/interface";
import {convertColor, formatColor} from "@/utils/color";

interface CardPropsType {
  modelValue: ColorInput,
  format?: ColorFormat,
  colors?: Array<Array<ColorInput>>,
  width?: string
  height?: string
}


const props = withDefaults(defineProps<CardPropsType>(), {
  format: 'rgb',
  width: '600px',
  height: '480px',
  colors: () => [
    [
      '#6C090B',
      '#901110',
      '#B42019',
      '#D73324',
      '#FB4932',
      '#FC725A',
      '#FD9983',
      '#FDBEAC',
      '#FEE0D5',
      '#FFF3EF',
    ],
    [
      '#5C0730',
      '#800E41',
      '#A41751',
      '#C72261',
      '#EB2F71',
      '#EF5686',
      '#F37E9F',
      '#F7A8BC',
      '#FBD3DC',
      '#FDEEF1',
    ],
    [
      '#4A1061',
      '#5E1776',
      '#731F8A',
      '#89289F',
      '#A033B3',
      '#B553C2',
      '#CA78D1',
      '#DDA0E1',
      '#EFCEF0',
      '#F7EBF7',
    ],
    [
      '#401B77',
      '#4C248C',
      '#582EA0',
      '#6439B5',
      '#7246C9',
      '#8865D4',
      '#A288DF',
      '#BEADE9',
      '#DDD4F4',
      '#F1EEFA',
    ],
    [
      '#171E65',
      '#20297A',
      '#29368E',
      '#3444A3',
      '#4053B7',
      '#5F71C5',
      '#8191D4',
      '#A7B4E2',
      '#D1D8F1',
      '#EDEFF8',
    ],
    [
      '#053170',
      '#0A4694',
      '#135CB8',
      '#1D75DB',
      '#2990FF',
      '#54A9FF',
      '#7FC1FF',
      '#A9D7FF',
      '#D4ECFF',
      '#EFF8FF',
    ],
    [
      '#003761',
      '#004D85',
      '#0366A9',
      '#0A81CC',
      '#139FF0',
      '#40B4F3',
      '#6EC8F6',
      '#9DDCF9',
      '#CEEEFC',
      '#EBF8FE',
    ],
    [
      '#04343D',
      '#074F5C',
      '#0A6C7B',
      '#0E8999',
      '#13A8B8',
      '#38BBC6',
      '#62CDD4',
      '#91DFE3',
      '#C6EFF1',
      '#E7F7F8',
    ],
    [
      '#023C39',
      '#045A55',
      '#07776F',
      '#0A9588',
      '#0EB3A1',
      '#33C2B0',
      '#5ED1C1',
      '#8EE1D3',
      '#C4F0E8',
      '#E6F7F4',
    ],
    [
      '#123C19',
      '#1C5A25',
      '#277731',
      '#32953D',
      '#3EB349',
      '#5DC264',
      '#7FD184',
      '#A6E1A8',
      '#D0F0D1',
      '#ECF7EC',
    ],
    [
      '#263D13',
      '#3B5C1D',
      '#517B28',
      '#679934',
      '#7FB840',
      '#97C65F',
      '#B0D481',
      '#C9E3A7',
      '#E4F1D1',
      '#F3F8ED',
    ],
    [
      '#314603',
      '#4B6905',
      '#678D09',
      '#84B00C',
      '#A2D311',
      '#AEDC3A',
      '#BDE566',
      '#CFED96',
      '#E5F6C9',
      '#F3FBE9',
    ],
    [
      '#544903',
      '#7E6C06',
      '#A88E0A',
      '#D2AF0F',
      '#FCCE14',
      '#FDDE43',
      '#FDEB71',
      '#FEF5A0',
      '#FEFBD0',
      '#FFFEEC',
    ],
    [
      '#512E09',
      '#794B0F',
      '#A16B16',
      '#CA8F1E',
      '#F2B726',
      '#F5CA50',
      '#F7DB7A',
      '#FAEAA6',
      '#FCF6D2',
      '#FEFBED',
    ],
    [
      '#551F03',
      '#803506',
      '#AA500A',
      '#D56F0F',
      '#FF9214',
      '#FFAE43',
      '#FFC772',
      '#FFDDA1',
      '#FFEFD0',
      '#FFF9ED',
    ],
    [
      '#1C1F23',
      '#2E3238',
      '#41464C',
      '#555B61',
      '#6B7075',
      '#888D92',
      '#A7ABB0',
      '#C6CACD',
      '#E6E8EA',
      '#F9F9F9',
    ],
  ],
})
const emit = defineEmits(["update:modelValue"])


const color: ComputedRef<ColorObject> = computed(() => {
  return convertColor(props.modelValue)
})

const change = (data: ColorObject) => {
  emit("update:modelValue", formatColor(data, props.format), data)
}

</script>


<style scoped>
.card-picker {
  height: fit-content;
  box-sizing: border-box;
  overflow-y: scroll;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
