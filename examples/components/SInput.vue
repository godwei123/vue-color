<template>
  <div class="wrap">
    <span
        @mouseup="up"
        @mousemove="move"
        @mousedown="down"
    >123</span>
    <input class="a"
           type="text" ref="input"
           v-model="value"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const input = ref(null)
const value = ref(5)

const flag = ref(false);

const fn = (e) => {
  e.preventDefault()
  e.stopPropagation();
  document.body.style.cursor = "ew-resize !important"
  console.log(flag.value)
  if (flag.value) {
    console.log("111")
  }
}

const up = () => {
  flag.value = false
  document.removeEventListener("mousemove", fn)
}
const move = () => {

}

document.addEventListener("mouseup", (e) => {
  document.removeEventListener("mousemove", fn)
})

const down = () => {
  flag.value = true
  document.addEventListener("mousemove", fn)
}


</script>

<style scoped>
.wrap:hover {
  box-shadow: inset 0 0 0 1px #dddddd;
}

.wrap {
  padding: 5px;
}

span:hover {
  cursor: ew-resize;
  user-select: none;
}

.a {
}
</style>
