<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import { NPagination } from "naive-ui";
import usePagination from "@/hooks/usePagination";
const { pageNum, pageSize, onPageUpdate, onPageSizeUpdate } = usePagination();
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
