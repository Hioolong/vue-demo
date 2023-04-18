<script setup lang="ts">
import { ref, computed } from "vue";

function generateData(nums: number, startNum = 0) {
  const result = [];
  for (let i = startNum; i < startNum + nums; i++) {
    result.push(`这是第 ${i} 条数据哦`);
  }
  return result;
}

const data = ref(generateData(100));
const loading = ref(false);

// 滚动容器高度
const containerHeight = document.body.offsetHeight;
// 每一条数据高度
const itemHeight = 60;
// 内容总高度
const contentHeight = computed(() => {
  return data.value.length * itemHeight;
});
// 上滚动区域高度
const startOffset = ref(0);

// 数组前后索引
const startIndex = ref(0);
const lastIndex = ref(Math.ceil(containerHeight / itemHeight));

// 展示的数据
const displayData = computed(() => {
  return data.value.slice(startIndex.value, lastIndex.value);
});
// 内容偏移度，用与设置渲染内容的动画，模拟滑动的效果
const contentOffset = computed(() => {
  return startOffset.value - (startOffset.value % itemHeight);
});

function onScroll(e: any) {
  if (e.target.scrollTop) {
    startOffset.value = e.target.scrollTop;
  }
  startIndex.value = Math.floor(startOffset.value / itemHeight);
  lastIndex.value = startIndex.value + Math.ceil(containerHeight / itemHeight);

  if (e.target.scrollTop + containerHeight > contentHeight.value) {
    loadMore();
  }
}

async function loadMore() {
  if (loading.value) return;
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newData = generateData(100, data.value.length);
  data.value = data.value.concat(newData);
  loading.value = false;
}
</script>

<template>
  <div class="scroll-box" @scroll="onScroll">
    <div class="placeholder" :style="{ height: contentHeight + 'px' }"></div>
    <ul
      class="list"
      :style="{ transform: `translate3d(0, ${contentOffset}px, 0)` }"
    >
      <li class="list-item" v-for="item in displayData" :key="item">
        {{ item }}
      </li>
    </ul>
    <div v-if="loading" class="loading">加载中...</div>
  </div>
</template>

<style scoped>
.scroll-box {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
.list {
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.list-item {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  list-style: none;
}
.loading {
  width: 100%;
  text-align: center;
}
</style>
