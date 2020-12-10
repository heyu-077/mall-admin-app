<template>
  <div class="home">
    <left-menu />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <top-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import TopHeader from './components/header.vue';

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    LeftMenu,
    TopHeader,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/Home.less");
</style>
