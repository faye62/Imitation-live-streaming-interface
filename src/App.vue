<template>
  <router-view/>
</template>

<script setup>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const showTabbar = ref(true);
// 监听路由变化，决定是否显示 Tabbar
watch(
    () => route.meta.showTabbar,
    (newVal) => {
      showTabbar.value = newVal !== false;
    },
    {immediate: true}
);
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

::-webkit-scrollbar {
  display: none; /* Chrome, Safari 和 Opera */
}
</style>
