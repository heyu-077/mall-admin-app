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
      <a-breadcrumb v-if="currentRoutes.length>1">
        <a-breadcrumb-item>
          {{ currentRoutes[0]? currentRoutes[0].meta.title : '' }}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{name: currentRoutes[1].name}">
            {{ currentRoutes[1]? currentRoutes[1].meta.title : '' }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="use-info">
      <li>欢迎{{ $store.state.user.username }} <a-icon type="down" /></li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoutes: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoutes = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      const isLogout = window.confirm('确认要退出吗?');
      if (isLogout) {
        this.$store.dispatch('loginOut');
        this.$router.push('/login');
      }
    },
  },
};
</script>
