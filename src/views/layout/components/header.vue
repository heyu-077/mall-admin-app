<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrump">
      <a-breadcrumb>
        <a-breadcrumb-item>商品</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">商品列表</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="use-info">
      <li>欢迎hy-077 <a-icon type="down" /></li>
      <li>退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
  },
};
</script>
