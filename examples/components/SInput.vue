<template>
  <div class="wrap">
    <span draggable="true"
          @dragstart="dragstart"
          @drag="drag"
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

const drag = (e) => {

  console.log("drag", e)
}
const dragstart = (e) => {

  e.preventDefault()
  e.dataTransfer.effectAllowed = "none"
  console.log("dragstart", e)
}

const handleUp = (e) => {
  console.log(e)
  e.preventDefault();

  e.stopPropagation();
  document.onmousemove = null
  document.body.style.cursor = 'default'
}
const handleDown = (event) => {
  //console.log(event)

  document.body.style.cursor = 'ew-resize !important'
  document.onmousemove = function (e) {
    //console.log('onmousemove', e);
    document.body.style.cursor = 'ew-resize !important'

    value.value++
    return false;

  };
  event.preventDefault();
  event.stopPropagation();
  return false
}


document.onmouseover = () => {
  document.body.style.cursor = 'ew-resize !important'
}
const handleMove = (e) => {
  e.preventDefault();
  e.stopPropagation();
}


function mouseDownAndMove(dom, callback) {
  let flag = false;
  let fn = function (e) {
    if (flag) callback(e);
  };
  // 添加鼠标按下监听
  dom.addEventListener("mousedown", function (even) {
    // 当鼠标按下时, 添加鼠标移动监听
    flag = true;
    dom.addEventListener("mousemove", fn)
  })

  // 添加鼠标弹起监听 , 即鼠标不在按下
  dom.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    flag = false;
    dom.removeEventListener("mousemove", fn);
  })
  // 当鼠标在其他元素中弹起时的操作, 规避鼠标弹起后 dom 无法捕获的异常
  document.addEventListener("mouseup", function () {
    // 此时移除 鼠标移动监听,移除指定 事件函数
    flag = false;
    dom.removeEventListener("mousemove", fn);
  });

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
